const { v4 } = require('uuid')
const { Okno } = require('../models/models')
const path = require('path')
const ApiError = require('../Error/ApiError')

class oknoController {
    async create(req, res, next) {
        try {
            let { name, price } = req.body;
            const { img } = req.files;
            let filename = v4() + ".jpg";

            img.mv(path.resolve(__dirname, '..', 'static', filename));

            const okno = await Okno.create({ name, price, img: filename });

            return res.json(okno)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }
    async getAll(req, res) {
        const okna = await Okno.findAll()
        return res.json(okna)
    }
    async getOne(req, res) {
        const { id } = req.params
        const okno = await Okno.findAll({ where: { id } })
        return res.json(okno)
    }

    async delete(req, res) {
        const { id } = req.params
        try {
            const item = await Okno.findOne({ where: { id } })
            console.log('Deleted: ', item);
            item.destroy()
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }



    }
}

module.exports = new oknoController()