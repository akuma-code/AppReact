const ApiError = require("../../Error/ApiError")
const { ProductionInfo, Warehouse } = require("../../models/WarehouseModel")
const dayjs = require('dayjs')

const getQuant = async (id) => await Warehouse.findOne({ where: { id: id }, attributes: ['quant'] })
    .then(data => Number(data.getDataValue('quant')))

async function QuantInc(warehouseId, value) {
    const item = await Warehouse.findOne({ where: { id: warehouseId } })
    item.increment('quant', { by: value })
    return item
}
const QuantDec = async (warehouseId, value) => {
    const item = await Warehouse.findOne({ where: { id: warehouseId } })
    item.decrement('quant', { by: value })
    return item
}



class WhProductionController {
    async getAll(req, res, next) {

        try {
            const infos = await ProductionInfo.findAndCountAll(
                { where: { status: "inProduction" } }
            )

            res.json(infos)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }
    async AUTO_COMPLETE(req, res, next) {
        const { days } = req.params
        try {
            const infos = await ProductionInfo.findAndCountAll(
                { where: { status: "inProduction" } }
            )
            const ac = autoCheck(infos.rows, days)
            // console.log(ac);
            // console.log(ac.map(a => a.dataValues));
            res.json(ac)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }


    async start(req, res, next) {
        const { warehouseId, dateReady, count, status } = req.body
        try {
            const info = await ProductionInfo.create({
                warehouseId,
                dateReady,
                status,
                count
            })
            res.json(info)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
    async startAndRemove(req, res, next) {
        const { warehouseId, dateReady, count, status } = req.body

        const info = await START_TASK({ warehouseId, count, dateReady, status })

        WH_CONTROL.DECREASE(count, warehouseId)
        res.json(info)

    }
    async finish(req, res, next) {
        const { id } = req.params

        console.log(id);
        try {
            const info = await ProductionInfo.update({
                status: 'Ready'
            }, { where: { id } })

            res.json(info)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
    async finishAndRestore(req, res, next) {
        const { id } = req.params
        const infos = await EndTaskAndRestoreQuant(id)
        res.json(infos)

    }
    async cleanUp(req, res, next) {

        try {
            await ProductionInfo.destroy({ truncate: true, cascade: true });
            res.json("Production Info CLEARED")
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }


    }
}

function autoCheck(infoArray = [], days = 0) {
    const diff = (date) => {
        const d = dayjs(date).diff(dayjs(), 'days')
        console.log(`DIFF TODAY(${dayjs()}) AND DATE(${dayjs(date)}) = ${d}`);
        return d
    }
    const passed = (date) => diff(date) <= days ? true : false
    const filtered = infoArray.filter(i => passed(i.dateReady))
    console.log(`##### elements <= ${days},  amount:`, filtered.length)


    // filtered.forEach(f => EndTaskAndRestoreQuant(f.id))


    return filtered
}

async function EndTaskAndRestoreQuant(id) {

    try {
        const [info, wh] = await useInfo(id)
        if (info.isRestored) return console.log("ITEMS ALREADY RESTORED!");
        const { count } = info

        await WH_CONTROL.INCREASE(count, wh.id)
        await END_TASK(id)

        return info
    } catch (error) {
        console.log("EndTaskError", error.message)
        return []
    }

}

async function useInfo(infoId) {
    const info = await ProductionInfo.findOne({ where: { id: infoId } })
    const wh = await Warehouse.findOne({ where: { id: info.warehouseId } })

    return [info, wh]
}

async function END_TASK(id) {

    try {
        await ProductionInfo.update({
            status: 'Ready',
            isRestored: true
        }, { where: { id } })
        console.log("TaskID #", id, " Complete!");

    } catch (error) {
        console.log("TASKID NOT FOUND, #", id,);
        return console.log(error);
    }

}

async function START_TASK({ warehouseId, count, dateReady, status }) {
    try {
        const info = await ProductionInfo.create({
            warehouseId,
            dateReady,
            status,
            count
        })


        return info
    } catch (error) {
        next(ApiError.badRequest(error.message))
    }
}
const WH_CONTROL = {
    INCREASE: async (numb, warehouseId) => {
        const wh = await Warehouse.findOne({ where: { id: warehouseId } })
        await wh.increment('quant', { by: numb })
    },

    DECREASE: async (numb, warehouseId) => {
        const wh = await Warehouse.findOne({ where: { id: warehouseId } })
        await wh.decrement('quant', { by: numb })
    }
}

module.exports = new WhProductionController()