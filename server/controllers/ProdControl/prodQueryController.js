const ApiError = require("../../Error/ApiError")
const ProductionManager = require("./prodManager.js")
const { Production, ProdQuery, SkladMain, Shop } = require("../../models/ProdModels")
const prodManager = require("./prodManager.js")
const { ProductionTask, QueryTask, PTQuery } = require("../../models/Tasks")
const { Op } = require("sequelize")
// const getQuant = async (skladId) => await SkladMain.findOne({ where: { id: skladId }, attributes: ['quant'] })
//     .then(data => data.getDataValue('quant'))
// const setQuant = async (skladId, quantPROD) => await SkladMain.findOne({ where: { id: skladId }, attributes: ['quant'] })
//     .then(data => data.update({ quant: data.quant + quantPROD }, { where: { id: skladId } }))
//     .then(data => data.toJSON())
// const QuantInc = async (skladId, value) => {
//     const item = await SkladMain.findOne({ where: { id: skladId } })
//     await item.increment('quant', { by: value })
//     return item
// }
class ProdQueryController {
    async getTest(req, res, next) {
        // const { skladId, quant, isReady = false, dateReady } = { skladId: 2, quant: 3, isReady: false, dateReady: "2022-07-01" }
        // const task = await Production.create({ skladId, quant, isReady, dateReady })
        //     .then(t => ProdQuery.create({ prodId: t.id, skladId: t.skladId }))

        const sklads = await SkladMain.findOne({ where: { id: 2 } })
            .then(data => QuantInc(2, 5))
        res.json(sklads)
    }

    async start(req, res, next) {
        const { skladId, number, isReady = false, dateReady } = req.body

        // const skladQuant = await getQuant(skladId).then(prev => prev - quant)

        try {
            const ptask = await ProductionManager.startTask(skladId, number, isReady, dateReady)
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