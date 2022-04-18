const ApiError = require("../../Error/ApiError")
const { SkladMain } = require('../../models/ProdModels')


class skladController {
    async create(req, res, next) {
        try {
            const { type, quant } = req.body
            const sItem = await SkladMain.create({ typeId: type, quant })

            return res.json(sItem)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res) {
        const items = await SkladMain.findAndCountAll()
        return res.json(items)
    }

    async getOne(req, res) {
        const { id } = req.params
        const items = await SkladMain.findAll({ where: { id } })
        return res.json(items)
    }
    async delete(req, res) {
        const { id } = req.params
        try {
            const item = await SkladMain.findOne({ where: { id } })
            console.log('Deleted: ', item);
            item.destroy()
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async clearALL() {
        return await SkladMain.destroy({ truncate: true })
    }
}

module.exports = new skladController()