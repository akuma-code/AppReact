const ApiError = require("../../Error/ApiError")
const { Production, ProdQuery, SkladMain } = require("../../models/ProdModels")


const getQuant = async (skladId) => await SkladMain.findOne({ where: { id: skladId }, attributes: ['quant'] })
    .then(data => data.getDataValue('quant'))

const EndTask = async (id) => await Production.findOne({ where: { id: id }, includes: [{ all: true }] }).then(
    task => {
        task.update({ isReady: true }, { where: { id: id } })
        return task
    })
class ProdQueryController {
    async start(req, res, next) {
        const { skladId, quant, isReady = false, dateReady } = req.body

        const sklad = await getQuant(skladId)
        const skladQuant = sklad - quant

        try {
            const ptask = await Production.create({ skladId, quant, dateReady, isReady })
            await ProdQuery.create({ prodId: ptask.id, skladId: skladId })
            await SkladMain.update({ quant: skladQuant }, { where: { id: skladId } })
            return res.json(ptask)
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

    async finishTask(req, res, next) {
        const { id } = req.params
        if (!id) console.log("Task ID не указан!")
        try {
            await EndTask(id)

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
}

module.exports = new ProdQueryController()