const ApiError = require("../../Error/ApiError")
const { ProductionInfo, Warehouse } = require("../../models/WarehouseModel")


const getQuant = async (id) => await Warehouse.findOne({ where: { id: id }, attributes: ['quant'] })
    .then(data => Number(data.getDataValue('quant')))

async function QuantInc(warehouseId, value) {
    const item = await Warehouse.findOne({ where: { id: warehouseId } })
    item.increment('quant', { by: value })
    return item
}
const QuantDec = async (warehouseId, value) => {
    const item = await Warehouse.findOne({ where: { id: warehouseId } })
    item.decrement('quant', { by: value })
    return item
}
class WhProductionController {
    async getAll(req, res, next) {
        try {
            const infos = await ProductionInfo.findAndCountAll()
            res.json(infos.rows)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }

    async getByWhitem(req, res, next) {
        const { id } = req.params
        if (!id) return console.log("ID NOT FOUND!");
        try {
            const infos = await ProductionInfo.findAndCountAll({
                where: { warehouseId: id },
                include: [{ all: true }]
            })

            res.json(infos)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async start(req, res, next) {
        const { warehouseId, dateReady, count, status } = req.body
        try {
            const info = await ProductionInfo.create({
                warehouseId,
                dateReady,
                status,
                count
            })
            res.json(info)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
    async startAndRemove(req, res, next) {
        const { warehouseId, dateReady, count, status } = req.body

        const wh = await Warehouse.findOne({ where: { id: warehouseId } })
        try {
            const info = await ProductionInfo.create({
                warehouseId,
                dateReady,
                status,
                count
            })
            await wh.decrement('quant', { by: count })
            res.json(info)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
    async finish(req, res, next) {
        const { id } = req.params

        console.log(id);
        try {
            const info = await ProductionInfo.update({
                status: 'Ready'
            }, { where: { id } })

            res.json(info)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
    async finishAndRestore(req, res, next) {
        const { warehouseId, id } = req.params

        try {
            const info = await ProductionInfo.findOne({ where: { id } })
            const wh = await Warehouse.findOne({ where: { id: warehouseId } })
            const { count } = info
            await ProductionInfo.update({
                status: 'Ready'
            }, { where: { id } })
            await wh.increment('quant', { by: count })
            res.json(info)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new WhProductionController()