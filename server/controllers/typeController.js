const { v4 } = require('uuid')
const { OkType, OkTypeInfo, Shop } = require('../models/prodModels')
const path = require('path')
const ApiError = require('../Error/ApiError');

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
                            typeId: newType.id
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

    async edit(req, res, next) {

        let { typeId, name, info, imgSrc, secondImg } = req.body

        try {
            let filename = (req.files) ? v4() + ".jpg" : imgSrc;
            if (req.files) {
                const { img } = req.files;

                img.mv(path.resolve(__dirname, '..', 'static', filename));
            }
            await OkType.update({ typeId: typeId, name: name, img: filename }, { where: { id: typeId } })

        } catch (error) {
            console.log('####### EDIT ERROR: ', error.message)
            next(ApiError.badRequest(error.message))
        }

        if (info) {
            const parsedInfo = JSON.parse(info)
            try {
                parsedInfo.forEach(info => {
                    if (info.added && info.desc) return OkTypeInfo.create({ desc: info.desc, typeId: typeId })
                    if (info.del || !info.typeId) return OkTypeInfo.destroy({ where: { id: info.id } })
                    OkTypeInfo.update({ desc: info.desc, typeId: typeId }, { where: { id: info.id } })
                })

                return res.status(200).json(parsedInfo)
            } catch (error) {
                console.log("##### updateINFO ERROR: ", error.message)
                next(ApiError.badRequest(error.message))
            }
        }



    }

    async getAll(req, res) {
        const types = await OkType.findAndCountAll({ include: [{ all: true, order: [OkType, 'name', 'ASC'] }] })
        return res.json(types)
    }
    async getAllInfo(req, res) {
        const info = await OkTypeInfo.findAll({ include: [{ all: true }] })
        return res.json(info)
    }


    async getOne(req, res) {
        const { id } = req.params
        if (!id) return console.log("ID NOT FOUND!");
        try {
            const type = await OkType.findOne({
                where: { id },
                include: [{ all: true }]
            })

            return res.json(type)
        } catch (error) {
            console.log('####### GETONE ERROR:', error.message)
        }

    }

    async delete(req, res, next) {
        const { id } = req.params
        try {
            const type = await OkType.findOne({
                where: { id },
            })
            // const shopItem = await Shop.findAll({
            //     where: { id: type.id }
            // })
            type.destroy({ truncate: true, cascade: true })
            // shopItem.destroy()
        } catch (error) {
            console.log('#######', error.message)
            next(ApiError.badRequest(error.message))
        }
    }

    async deleteAll(req, res, next) {

        try {
            await OkType.destroy({ truncate: true, cascade: true })
            console.log("Types destroyed!");
        } catch (error) {
            console.log('#######', error.message)
            next(ApiError.badRequest(error.message))
        }
    }


}

module.exports = new TypeController()