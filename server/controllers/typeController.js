const { v4 } = require('uuid')
const { OkType, OkTypeInfo } = require('../models/typeModels')
const path = require('path')
const ApiError = require('../Error/ApiError')

class TypeController {
    async create(req, res, next) {
        try {
            let { type, price, info } = req.body;
            const { img } = req.files;
            let filename = v4() + ".jpg";

            img.mv(path.resolve(__dirname, '..', 'static', filename));

            const okno = await OkType.create({ type, price, img: filename });

            if (info) {
                console.log(info);
                try {
                    info = JSON.parse(info)
                    info.forEach(i =>
                        OkTypeInfo.create({
                            title: i.title,
                            desc: i.desc,
                            typeId: okno.id
                        }))
                } catch (error) {
                    console.log("#####", error.message)
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
        try {
            const { id } = req.params
            const typeid = id
            const okno = await OkType.findOne({
                where: { id },
                include: [{ model: OkTypeInfo, as: 'info' }]
            },
            )
            // console.log('okno', okno)
            return res.json(okno)
        } catch (error) {
            console.log('#######', error.message)
        }

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