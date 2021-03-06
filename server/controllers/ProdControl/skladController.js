const ApiError = require("../../Error/ApiError")
const { SkladMain, OkTypeInfo } = require('../../models/ProdModels')


class skladController {
    async create(req, res, next) {
        try {

            const { typeId, quant } = req.body

            const sItem = await SkladMain.create({ typeId, quant })

            return res.json(sItem)

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res) {
        const items = await SkladMain.findAndCountAll({ include: [{ all: true, nested: true }], order: ['typeId'] })
        return res.json(items)
    }

    async getOne(req, res) {
        const { id } = req.params
        const items = await SkladMain.findAll({ where: { id }, include: [{ all: true }] })
        return res.json(items)
    }
    async delete(req, res, next) {
        const { id } = req.params
        try {
            const item = await SkladMain.findOne({ where: { id } })
            console.log('Deleted: ', item.dataValues);
            item.destroy()
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async clearALL(req, res, next) {
        try {
            await SkladMain.destroy({ truncate: true, cascade: true });
            res.json("SKLAD CLEARED")
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }

    async update(req, res, next) {

        const { id, typeId, quant } = req.body
        try {
            const item = await SkladMain.findOne({ where: { id }, include: [{ all: true }] })
            item.update({ typeId: typeId, quant: quant }, { where: { id, typeId } })
            res.json(item)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async addToShop(req, res, next) {
        const { id, typeId, shopId } = req.body
        try {
            const item = await SkladMain.findOne({ where: { id }, include: [{ all: true }] })
            item.update({ shopId: shopId, quant: quant, typeId: typeId }, { where: { id, typeId } })
            res.json(item)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new skladController()