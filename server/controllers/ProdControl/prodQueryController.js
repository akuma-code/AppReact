const ApiError = require("../../Error/ApiError")
const ProductionManager = require("./prodManager.js")
const { Production, ProdQuery, SkladMain } = require("../../models/ProdModels")
const prodManager = require("./prodManager.js")
const { ProductionTask, QueryTask, PTQuery } = require("../../models/Tasks")
const getQuant = async (skladId) => await SkladMain.findOne({ where: { id: skladId }, attributes: ['quant'] })
    .then(data => data.getDataValue('quant'))
const setQuant = async (skladId, quantPROD) => await SkladMain.findOne({ where: { id: skladId }, attributes: ['quant'] })
    .then(data => data.update({ quant: data.quant + quantPROD }, { where: { id: skladId } }))
    .then(data => data.toJSON())

class ProdQueryController {
    async getTest(req, res, next) {
        const { skladId, quant, isReady = false } = req.body
        const test = new ProductionTask(skladId, quant)
        console.log(test.getForm());
        const qpt = new PTQuery(skladId, 1, 1)
        const qpt1 = new PTQuery(skladId, 2, 1)
        const qt = new QueryTask([qpt, qpt1], "22/07/28")
        console.log('qt :>> ', qt);
        res.json(qt)
    }

    async start(req, res, next) {
        const { skladId, quant, isReady = false, dateReady } = req.body

        // const skladQuant = await getQuant(skladId).then(prev => prev - quant)

        try {
            const ptask = await ProductionManager.startTask(skladId, quant, isReady, dateReady)
            //     const ptask = await Production.create({ skladId, quant, dateReady, isReady })
            //     await ProdQuery.create({ prodId: ptask.id, skladId: skladId, quant: quant })
            //     await SkladMain.update({ quant: skladQuant }, { where: { id: skladId } })
            //     return res.json(ptask)
            res.json(ptask)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }

    async getOne(req, res, next) {
        const { id } = req.params
        const { nested } = req.query
        let item;
        if (nested === 'true') item = await Production.findAll({ where: { id }, include: [{ all: true, nested: true }] })
        else item = await Production.findAll({ where: { id }, include: [{ all: true }] })
        return res.json(item)
    }
    async getAll(req, res, next) {
        const { nested } = req.query
        let items;

        if (nested === 'true') items = await Production.findAndCountAll({ include: [{ all: true, nested: true }] })
        else items = await Production.findAndCountAll({ include: [{ all: true }] })
        return res.json(items)
    }

    async getFinished(req, res, next) {
        const items = await Production.findAndCountAll({
            include: [{ all: true }], where: { isReady: true }
        })
        return res.json(items)
    }
    async getProdUnfinished(req, res, next) {
        const items = await Production.findAndCountAll({
            where: { isReady: false },
            include: [{ all: true, nested: true }]
        })
        return res.json(items)
    }

    async finishTask(req, res, next) {
        const { id } = req.params
        if (!id) console.log("Task ID не указан!")
        try {
            // await EndTask(id)

            await ProductionManager.finishProdTask(id)
            return res.json(`Production Task (id:${id}) complete`)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }

    async getQuery(req, res, next) {
        try {
            const items = await ProdQuery.findAndCountAll({ include: [{ all: true, nested: true }] })
            return res.json(items)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }

    async clearALL(req, res, next) {
        try {
            await Production.destroy({ truncate: true, cascade: true });
            res.json("Production CLEARED!")
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }

    async setQuant(req, res, next) {
        const { skladId, quantProd } = req.body
        try {
            await prodManager.setQuant(skladId, quantProd)
            res.json(`SkladItem, id: ${skladId} was changed`)

        } catch (e) {
            console.log(e.message)
            next(e.message)
        }

    }


}

module.exports = new ProdQueryController()