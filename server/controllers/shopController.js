const { Shop, OkType, OkTypeInfo, SkladMain } = require('../models/prodModels')
const ApiError = require('../Error/ApiError')

class ShopController {
    async create(req, res, next) {
        let { skladId, price, title } = req.body;

        try {
            const okno = await Shop.create({ title, price, skladId });
            const skPos = await SkladMain.findOne({ where: { id: skladId } })
            skPos.update({ shopId: okno.id }, { where: { id: skladId } })

            console.log('updated :>> ', skPos.dataValues);
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
        let { TYPEId } = req.query
        const okna = await Shop.findAndCountAll({
            where: { TYPEId },
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

    async deleteAll(req, res, next) {
        try {
            await Shop.destroy({ truncate: true, cascade: true });

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new ShopController()