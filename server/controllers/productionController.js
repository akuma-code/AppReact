const ApiError = require("../Error/ApiError")
const { Production_db } = require('../models/typeModels')


class ProductionController {
    async create(req, res, next) {
        try {
            const { type, date, count } = req.body
            const ProductionItem = await Production_db.create({ type, date, count })

            return res.json(ProductionItem)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }

    async getAll(req, res) {
        const items = await Production_db.findAll()
        return res.json(items)
    }

    async getOne(req, res) {
        const { id } = req.params
        const items = await Production_db.findAndCountAll({ where: { id } })
        return res.json(items)
    }




    async delete(req, res) {
        const { id } = req.params
        try {
            const item = await Production_db.findOne({ where: { id } })
            item.destroy()
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }
}

module.exports = new ProductionController()