const ApiError = require("../../Error/ApiError")
const { Production, ProdQuery, SkladMain } = require("../../models/ProdModels")

const getQuant = async (skladId) => await SkladMain.findOne({ where: { id: skladId }, attributes: ['quant'] })
    .then(data => Number(data.getDataValue('quant')))



async function QuantInc(skladId, value) {
    const item = await SkladMain.findOne({ where: { id: skladId } })
    item.increment('quant', { by: value })
    return item
}
const QuantDec = async (skladId, value) => {
    const item = await SkladMain.findOne({ where: { id: skladId } })
    item.decrement('quant', { by: value })
    return item
}
const createTask = async ({ skladId, number, dateReady, isReady }) => {
    const ptask = await Production.create({ skladId, number, dateReady, isReady })
    const pq = await ProdQuery.create({ prodId: ptask.id, skladId: skladId })
    return ptask
}

class ProductionManager {

    async startTask(skladId, number, isReady = false, dateReady) {
        // quant *= -1
        // const skladQuant = await getQuant(skladId).then(prev => prev - quant)

        try {
            const PTask = await createTask({ skladId, number, dateReady, isReady })
                .then(data => QuantDec(skladId, number))
            // SetSkladQuant({ skladId, quant })
            return PTask
        } catch (error) {
            console.log(error.message)
        }
    }



    async finishProdTask(prodId) {
        const prodUnit = await Production.findOne({ where: { id: prodId }, attributes: ['isReady', 'number'], include: [{ all: true, nested: true }] })
        const finished = await prodUnit.getDataValue('isReady') === true

        if (finished) return console.log("Task Already Finished!");

        const skladId = await ProdQuery.findOne({ where: { prodId: prodId } })
            .then(data => data.getDataValue('skladId'))
        const number = await prodUnit.getDataValue('number')

        Production.update({ isReady: true }, { where: { id: prodId } })
            .then(data => QuantInc(skladId, number))
        return prodUnit
    }

}

module.exports = new ProductionManager()
