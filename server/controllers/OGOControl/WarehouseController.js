const { v4 } = require("uuid")
const ApiError = require("../../Error/ApiError")
const { SkladMain } = require('../../models/ProdModels')
const { Warehouse } = require("../../models/WarehouseModel")
const path = require('path')

class WarehouseController {
    async create(req, res, next) {
        try {

            const { quant, price, typename } = req.body

            const WhItem = await Warehouse.create({ quant, typename, price })
            console.log("Created Warehouse: ", WhItem);
            if (req.files) {
                try {
                    let filename_main = v4() + ".jpg"
                    let filename_sec = "secondary_" + v4() + ".jpg"
                    const { file_main, file_sec } = req.files

                    file_main.mv(path.resolve(__dirname, '..', 'static', filename_main));
                    file_sec && file_sec.mv(path.resolve(__dirname, '..', 'static', filename_sec));
                    await WhItem.update({ img_main: filename_main, img_sec: filename_sec })

                } catch (error) {
                    console.log('####### EDIT ERROR: ', error.message)
                    next(ApiError.badRequest(error.message))
                }
            }

            return res.json(WhItem)

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
    async copySklad(req, res, next) {
        const { skladId } = req.params

        try {
            const sklad = await SkladMain.findOne({ where: { id: skladId }, include: [{ all: true, nested: true }] })
            console.log('sklad', sklad.dataValues)
            const { quant, shop, type: { img, secondaryImg, name } } = sklad.dataValues
            const { price } = shop
            const typename = name
            const WhItem = await Warehouse.create({ quant, img_main: img, img_sec: secondaryImg, price, typename, price, })
            console.log("Copyied Warehouse: ", WhItem.dataValues);

            return res.json(WhItem)

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }
    async edit(req, res, next) {
        const { id } = req.params
        const WhItem = await Warehouse.findOne({ where: { id } })
        const { quant, img_main, img_sec, price, typename } = req.body
        try {


            WhItem.update({ quant: quant, img_main: img_main, img_sec: img_sec, price: price, typename: typename }, { where: { id } })
            if (req.files) {
                let filename_main = "main_" + v4() + ".jpg"
                let filename_sec = "secondary_" + v4() + ".jpg"
                const { file_main, file_sec } = req.files

                file_main.mv(path.resolve(__dirname, '../..', 'static', filename_main));
                file_sec && file_sec.mv(path.resolve(__dirname, '../..', 'static', filename_sec));
                await WhItem.update({ img_main: filename_main, img_sec: filename_sec }, { where: { id } })

            }
            console.log("Updated Warehouse: ", WhItem.dataValues);
            return res.json(WhItem)

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }

    async getAll(req, res, next) {
        try {

            const items = await Warehouse.findAndCountAll({ include: [{ all: true, nested: true }] })
            return res.json(items)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
    async delete(req, res, next) {
        const { id } = req.params
        try {
            const item = await Warehouse.findOne({ where: { id: id } })
            item.destroy()
            return res.json(item)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async deleteAll(req, res, next) {

        try {
            await Warehouse.destroy({ truncate: true, cascade: true })
            console.log("Warehouse cleared!");
        } catch (error) {
            console.log('#######', error.message)
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new WarehouseController()