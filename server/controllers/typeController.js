const { v4 } = require('uuid')
const { OkType, OkTypeInfo } = require('../models/typeModels')
const path = require('path')
const ApiError = require('../Error/ApiError')

class TypeController {
    async create(req, res, next) {
        try {
            let { type, price, info, typeId } = req.body;
            const { img } = req.files;
            let filename = v4() + ".jpg";

            img.mv(path.resolve(__dirname, '..', 'static', filename));

            const okno = await OkType.create({ type, typeId, price, img: filename });

            if (info) {
                try {
                    info = JSON.parse(info)
                    info.forEach((i) =>
                        OkTypeInfo.create({
                            title: i.title,
                            desc: i.desc,
                            oktypeId: typeId
                        }))
                } catch (error) {
                    next(console.warn(error.message))
                }

            }

            return res.json(okno)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }
    async getAll(req, res) {
        const okna = await OkType.findAndCountAll()
        return res.json(okna)
    }
    async getOne(req, res) {
        const { id } = req.params
        const okno = await OkType.findOne({
            where: { id },
            include: [{ model: OkTypeInfo, as: 'info' }]
        })
        return res.json(okno)
    }

    async delete(req, res) {
        const { id } = req.params
        try {
            const item = await OkType.findOne({ where: { id } })
            console.log('Deleted: ', item);
            item.destroy()
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }



    }
}

module.exports = new TypeController()