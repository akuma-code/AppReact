const { Warehouse } = require("../../models/WarehouseModel")
const { getUrlFromDB } = require("../options/ServerOptions")

const names = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]


const models = names.map(numb => ({
    typename: "OK-" + numb,
    price: 0,
    quant: 10,
    img_main: `assets/OK-${numb}.jpg`,
    img_sec: `assets/sec_ok(${numb}).jpg`
}))


const createModels = async () => {
    const url = await getUrlFromDB('host_url')
    try {
        const m = await Warehouse.bulkCreate(models)
        console.log(m.length, " Models created");
        return m
    } catch (error) {
        console.log(error.message);
    }


}

module.exports = createModels