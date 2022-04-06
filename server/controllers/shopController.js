const { Shop } = require('../models/typeModels')
const ApiError = require('../Error/ApiError')

class ShopController {
    async create(req, res, next) {
        let { title, price, typeId } = req.body;
        try {

            const okno = await Shop.create({ title, price, typeId: typeId });
            return res.json(okno)
        }
        catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res) {
        const okna = await Shop.findAndCountAll()
        return res.json(okna)
    }
}

module.exports = new ShopController()