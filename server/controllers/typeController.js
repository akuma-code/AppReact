const { v4 } = require('uuid')
const { OkType, OkTypeInfo, Shop } = require('../models/prodModels')
const path = require('path')
const ApiError = require('../Error/ApiError')

class TypeController {
    async create(req, res, next) {
        try {
            let { name, info } = req.body;
            const { img } = req.files;
            let filename = v4() + ".jpg";

            img.mv(path.resolve(__dirname, '..', 'static', filename));

            const newType = await OkType.create({ name, img: filename });

            if (info) {

                try {
                    info = JSON.parse(info)
                    info.forEach(i =>
                        OkTypeInfo.create({
                            desc: i.desc,
                            TYPEId: newType.id
                        }))
                } catch (error) {
                    console.log("#####", error.message)
                }

            }

            return res.json(newType)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }
    async getAll(req, res) {
        const types = await OkType.findAndCountAll({ include: [{ all: true }] })
        return res.json(types)
    }
    async getAllInfo(req, res) {
        const info = await OkTypeInfo.findAll({ include: [{ all: true }] })
        return res.json(info)
    }


    async getOne(req, res) {
        try {
            const { id } = req.params
            const type = await OkType.findOne({
                where: { id },
                include: [{ all: true }]
            })

            return res.json(type)
        } catch (error) {
            console.log('#######', error.message)
        }

    }

    async delete(req, res, next) {
        const { id } = req.params
        try {
            const type = await OkType.findOne({
                where: { id },
            })
            const shopItem = await Shop.findAll({
                where: { id: type.id }
            })
            type.destroy()
            shopItem.destroy()
        } catch (error) {
            console.log('#######', error.message)
            next(ApiError.badRequest(error.message))
        }
    }

    async edit(req, res, next) {
        const { id, newItem } = req.body
        try {
            const item = await OkType.find({ where: { id }, include: [{ model: OkTypeInfo, as: 'info' }] })

            return res.json(item)
        } catch (error) {
            console.log('#######', error.message)
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new TypeController()