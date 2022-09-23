const { ProductionInfo } = require("../../models/WarehouseModel")



class WhProductionController {
    async getAll(req, res, next) {
        try {
            const infos = await ProductionInfo.findAndCountAll({ include: [{ all: true, nested: true }] })
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
    async finish(req, res, next) {
        const { id, whId } = req.body

        try {
            const info = await ProductionInfo.update({
                status: 'Ready'
            },
                { where: { id } })

            res.json(info)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new WhProductionController()