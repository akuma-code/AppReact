const ApiError = require("../../Error/ApiError")
const { Production, ProdQuery, SkladMain } = require("../../models/ProdModels")


const getQuant = async (skladId) => await SkladMain.findOne({ where: { id: skladId }, attributes: ['quant'] })
    .then(data => data.getDataValue('quant'))

const SkladQuantIncrease = async (query) => {
    if (!query.dataValues) return console.log("QUERY ERROR", query);
    const { skladId, quant, prodId } = query.dataValues
    getQuant(skladId)
        .then(prev => prev + quant)
        .then(newQuant => {
            Production.update({ isReady: true }, { where: { id: prodId } })
            SkladMain.update({ quant: newQuant }, { where: { id: skladId } })
        })

}
const SkladQuantDecrease = async (query) => {
    if (!query.dataValues) return console.log("QUERY ERROR", query);
    const { skladId, quant, prodId } = query.dataValues
    getQuant(skladId)
        .then(prev => prev - quant)
        .then(newQuant => {
            Production.update({ isReady: true }, { where: { id: prodId } })
            SkladMain.update({ quant: newQuant }, { where: { id: skladId } })
        })

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
                .then(SkladQuantIncrease)

        }
        else {
            console.log("Task Already Finished!");
        }
        return prodUnit
    }

}

module.exports = new ProductionManager()