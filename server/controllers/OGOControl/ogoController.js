const { v4 } = require('uuid')
const { OkType, Shop, Sklad } = require('../../models/ProdModels')
const path = require('path')
const ApiError = require('../../Error/ApiError');

class OgoController {
    async editALL(req, res, next) {
        const { name, price, quant, id, typeId, shopId } = req.body
        const { img, secondaryImg } = req.files
        console.log({ name, price, quant, id, typeId, shopId })
    }
}

module.exports = new OgoController()