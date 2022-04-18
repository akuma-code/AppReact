const { Shop, OkType, OkTypeInfo } = require('../models/prodModels')
const ApiError = require('../Error/ApiError')

class ShopController {
    async create(req, res, next) {
        let { price, skladId, title } = req.body;

        try {
            const okno = await Shop.create({ title, price, skladId });
            return res.json(okno)
        }
        catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res) {

        const okna = await Shop.findAndCountAll({ include: [{ all: true }] })
        // const okna = await Shop.findAndCountAll({ include: [{ model: OkType, include: [{ model: OkTypeInfo, as: 'info' }] }] })
        return res.json(okna)
    }

    async getSorted(req, res) {
        let { typeId } = req.query
        const okna = await Shop.findAndCountAll({
            where: { typeId },
            include: [{ model: OkType, as: 'type', include: [{ model: OkTypeInfo, as: 'info' }] }]
        })
        return res.json(okna)
    }

    async getOne(req, res) {
        try {
            const { id } = req.params

            const okno = await Shop.findOne({
                where: { id },
                include: [{ model: OkType, include: [{ model: OkTypeInfo, as: 'info' }] }]
            },
            )
            return res.json(okno)
        } catch (error) {
            console.log('#######', error.message)
        }

    }

    async delete(req, res, next) {
        const { id } = req.params
        try {
            const item = await Shop.findOne({
                where: { id },
                include: [{ model: OkType }]
            })

            item.destroy()
        } catch (error) {
            console.log('#######', error.message)
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new ShopController()