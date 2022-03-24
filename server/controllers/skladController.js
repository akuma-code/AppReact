const ApiError = require("../Error/ApiError")
const { Ogo_SKLAD } = require('../models/models')


class skaldController {
    async create(req, res, next) {
        try {
            const { title, count } = req.body
            const ogoItem = await Ogo_SKLAD.create({ title, count })

            return res.json(ogoItem)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }

    async getAll(req, res) {
        console.log('getall');
        const items = await Ogo_SKLAD.findAll()
        return res.json(items)
    }

    async getOne(req, res) {
        const { id } = req.params
        const items = await Ogo_SKLAD.findAndCountAll({ where: { id } })
        return res.json(items)
    }

    async updateCount(req, res) {
        const { id } = req.params
        const { title, amount } = req.query
        const item = await Ogo_SKLAD.findOne({ where: { id } })
        item.update(amount, { where: { count: amount } })
        return item
    }

    async updateItem(req, res) {

    }
    async deleteItem(req, res) {
        const { id } = req.params
        try {
            const item = await Ogo_SKLAD.findOne({ where: { id } })
            console.log('Deleted: ', item);
            item.destroy()
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }
}

module.exports = new skaldController()