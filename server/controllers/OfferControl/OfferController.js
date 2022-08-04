const ApiError = require("../../Error/ApiError")
const { BPM, Client, ClientAdress, Offer, ProductionTask } = require("../../models/usersOfferModels")
const OfferManager = require("./OfferManager")

class OfferController {
    async getAll(req, res, next) {
        try {
            const offers = await Offer.findAndCountAll({ include: [{ all: true }] })
            return res.json(offers)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async create(req, res, next) {
        try {
            const { bpmId, clientId, items } = req.body
            const newoffer = await OfferManager.CreateOffer({ bpmId, clientId, items })
            return res.json(newoffer)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }
}

module.exports = new OfferController()