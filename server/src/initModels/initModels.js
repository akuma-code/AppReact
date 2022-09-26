const { Warehouse } = require("../../models/WarehouseModel")

const names = ["ОК-1", "ОК-2", "ОК-3", "ОК-4", "ОК-5", "ОК-6", "ОК-7", "ОК-8", "ОК-9", "ОК-10", "ОК-11"]

const initObjects = names
    .map(typename => ({
        typename,
        price: 0,
        quant: 5,
        img_main: "",
        img_sec: ""
    }))

const createModels = async () => {

    try {
        const m = await Warehouse.bulkCreate(initObjects)
        return m
    } catch (error) {
        console.log(error.message);
    }


}

module.exports = createModels