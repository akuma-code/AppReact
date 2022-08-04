const ApiError = require("../../Error/ApiError")
const { BPM, Client, ClientAdress, Offer, ProductionTask } = require("../../models/usersOfferModels")

class OfferManager {

    async CreateOffer(newOffer) {
        const { bpmId, clientId, items } = newOffer
        const off = await Offer.create({ bpmId, clientId })
        return off
    }



}

module.exports = new OfferManager()