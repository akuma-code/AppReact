const { ServerOptions } = require("../../models/WarehouseModel");
const os = require("os");


const initOptions = async () => {
    const init_values = [{
        param: "autocomplete",
        boolvalue: true
    },
    {
        param: "host_url",
        value: "http://localhost:5000"
    }]
    const op = await ServerOptions.bulkCreate(init_values)
    return op

}

const getUrlFromDB = async (param) => {
    const op = await ServerOptions.findOne({ where: { param } })
    return op.dataValues.value
}

const setUrlFromOs = async () => {
    const host = os.hostname()
    const PORT = process.env.PORT
    const url = `http://${host}:${PORT}`
    const op = await ServerOptions.findOne({ where: { param: "host_url" } })
    op.update({ value: url })
    return op
}

module.exports = { initOptions, getUrlFromDB, setUrlFromOs }