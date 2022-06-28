const ApiError = require("../../Error/ApiError")
const { Production, ProdQuery, SkladMain } = require("../../models/ProdModels")

const getQuant = async (skladId) => await SkladMain.findOne({ where: { id: skladId }, attributes: ['quant'] })
    .then(data => data.getDataValue('quant'))

const setQuant = async (skladId, current) => await getQuant(skladId)
    .then(prev => Number(prev) + Number(current))
    .then(newQuant => SkladMain.update({ quant: newQuant }, { where: { id: skladId } }))

const SetSkladQuant = async (query) => {
    if (!query.dataValues) return console.log("QUERY ERROR", query);
    const { skladId, quant, prodId } = query.dataValues
    getQuant(skladId)
        .then(prev => Number(prev) + quant)
        .then(newQuant => {
            SkladMain.update({ quant: newQuant }, { where: { id: skladId } })
        })
    Production.update({ isReady: true }, { where: { id: prodId } })

}


class ProductionManager {
    async startTask(skladId, quant, isReady = false, dateReady) {

        const skladQuant = await getQuant(skladId).then(prev => prev - quant)

        try {
            const ptask = await Production.create({ skladId, quant, dateReady, isReady })
            await ProdQuery.create({ prodId: ptask.id, skladId: skladId, quant: quant })
            await SkladMain.update({ quant: skladQuant }, { where: { id: skladId } })
            return ptask
        } catch (error) {
            console.log(error.message)
        }
    }


    async endTask(prodId) {
        const prodUnit = await Production.findOne({ where: { id: prodId }, attributes: ['isReady'] })

        const finished = await prodUnit.getDataValue('isReady') === true

        if (!finished) {
            await ProdQuery.findOne({ where: { prodId: prodId }, includes: [{ all: true, nested: true }] })
                .then(SetSkladQuant)

        }
        else {
            console.log("Task Already Finished!");
        }
        return prodUnit
    }
    async finishProdTask(prodId) {
        const prodUnit = await Production.findOne({ where: { id: prodId }, attributes: ['isReady', 'quant'], include: [{ all: true }] })
        const finished = await prodUnit.getDataValue('isReady') === true
        if (finished) return console.log("Task Already Finished!");

        prodUnit.update({ isReady: true }, { where: { id: prodId } })
            .then(setQuant(prodUnit.sklads[0].skladId, prodUnit.quant))
        return prodUnit
    }
    async setQuant(skladId, current) {
        const item = await getQuant(skladId)
            .then(prev => Number(prev) + Number(current))
            .then(newQuant => SkladMain.update({ quant: newQuant }, { where: { id: skladId } }))
        return item
    }
}

module.exports = new ProductionManager()