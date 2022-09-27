const { ServerOptions } = require("../../models/WarehouseModel");
const os = require("os");


const initOptions = async () => {
    const init_values = [{
        param: "autocomplete",
        value: "on"
    },
    {
        param: "host_url",
        value: "http://localhost:5000"
    }]
    const op = await ServerOptions.bulkCreate(init_values)
    // await ServerOptions.sync({ alter: true })
    return op

}

const getUrlFromDB = async (param) => {
    try {

        const op = await ServerOptions.findOne({ where: { param } })
        return op.dataValues.value
    } catch (e) {
        console.log("Get URL ERROR: ", e.message);
        const op = await ServerOptions.findAll()
        return op
    }
}

const setUrlFromOs = async () => {
    const host = os.hostname()
    const PORT = process.env.PORT
    const url = `http://${host}:${PORT}`
    console.log('HOST URL: ', url)
    try {

        const op = await ServerOptions.findOne({ where: { param: "host_url" } })
        op.update({ value: url })
        return op
    } catch (e) {
        console.log(e.message);
        const op = await ServerOptions.create({
            param: "host_url",
            value: "http://localhost:5000"
        })
        return op
    }
}

module.exports = { initOptions, getUrlFromDB, setUrlFromOs }