const ApiError = require("../Error/ApiError")
const { Production } = require('../models/prodModels')


class ProductionController {
    async create(req, res, next) {
        try {

            const { type, date, count } = req.body
            const ProductionItem = await Production.create({ type, date, count })
            return res.json(ProductionItem)

        } catch (error) {

            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res) {
        const items = await Production.findAll()
        return res.json(items)
    }

    async getOne(req, res) {
        const { id } = req.params
        const items = await Production.findAndCountAll({ where: { id } })
        return res.json(items)
    }




    async delete(req, res) {
        const { id } = req.params
        try {
            const item = await Production.findOne({ where: { id } })
            item.destroy()
            return res.json(item)

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }
}

module.exports = new ProductionController()