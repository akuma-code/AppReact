const ApiError = require("../Error/ApiError")
const { Amount } = require('../models/typeModels')


class AmountController {
    async create(req, res, next) {
        try {
            const { type, count } = req.body
            const sItem = await Amount.create({ type, count })

            return res.json(sItem)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }

    async getAll(req, res) {
        const items = await Amount.findAll()
        return res.json(items)
    }

    async getOne(req, res) {
        const { id } = req.params
        const items = await Amount.findOne({ where: { id } })
        return res.json(items)
    }

    async update(req, res) {
        const { id } = req.params
        const { amount } = req.body
        const item = await Amount.findOne({ where: { id } })
        item.update(amount, { where: { count: amount } })
        return res.json(item)
    }


    async delete(req, res) {
        const { id } = req.params
        try {
            const item = await Amount.findOne({ where: { id } })
            item.destroy()
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }
}

module.exports = new AmountController()