const { ServerOptions, Warehouse } = require('../models/WarehouseModel');
const createModels = require('../src/initModels/initModels');
const OPT = require('../src/options/ServerOptions')
const os = require('os')
class SettingsController {
    async reset(req, res, next) {
        try {
            const S = await ServerOptions.destroy({ truncate: true })
            const options = await OPT.initOptions()
            res.json(options)
        } catch (error) {
            console.log(e.messgae);
        }
    }
    async getOptions(req, res, next) {
        const { param } = req.query
        console.log(param);
        if (!param) {
            const all = await ServerOptions.findAll()
            return res.json(all)
        }
        try {
            const S = await ServerOptions.findOne({ where: { param } })
            res.json(S.value)
        } catch (error) {
            console.log("OptionsError", error);
            next(error)
        }

    }

    async setHostUrl(req, res, next) {
        const s = await OPT.setUrlFromOs()
        res.json(s)
    }

    async getHostUrl(req, res, next) {
        try {
            const S = await ServerOptions.findOne({ where: { param: "host_url" } })
            res.json(S.value)
        } catch (error) {
            console.log("OptionsError", error);
            next(error)
        }
    }
    async showUrl(req, res, next) {
        const host = os.hostname()
        const port = process.env.PORT
        const urlstring = `http://${host}:${port}`
        return res.json(urlstring)
    }
    async initModels(req, res, next) {
        try {
            await Warehouse.destroy({ truncate: true, cascade: true })
            createModels()
            res.json("Models restarted")
        } catch (error) {
            console.log("InitError", error);
        }


    }
}


module.exports = new SettingsController()