const ApiError = require("../Error/ApiError")
const { SKLAD } = require('../models/typeModels')


class skladController {
    async create(req, res, next) {
        try {
            const { type } = req.body
            const sItem = await SKLAD.create({ type })

            return res.json(sItem)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }

    async getAll(req, res) {
        const items = await SKLAD.findAll()
        return res.json(items)
    }

    async getOne(req, res) {
        const { id } = req.params
        const items = await SKLAD.findAndCountAll({ where: { id } })
        return res.json(items)
    }




    async delete(req, res) {
        const { id } = req.params
        try {
            const item = await SKLAD.findOne({ where: { id } })
            console.log('Deleted: ', item);
            item.destroy()
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }
}

module.exports = new skladController()