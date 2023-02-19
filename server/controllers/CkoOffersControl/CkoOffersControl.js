const ApiError = require('../../Error/ApiError')
const { CkoOffersListModel: OffList } = require('../../models/CkoOffersListModel')



class CkoOffersController {
    async create(req, res, next) {
        const new_offer = req.body
        const { offer_id, companyName, companyTag, dateReady, isDocSigned, isDocRequested, status } = new_offer
        try {
            const m = await OffList.create(new_offer)
            console.log('CreatedOffer: ', m.dataValues)
            return res.json(m)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
    async getAll(req, res, next) {
        try {

            const offers = await OffList.findAndCountAll({ include: [{ all: true, nested: true }] })
            return res.json(offers)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
    async edit(req, res, next) {
        const { id } = req.params
        const offer = await OffList.findOne({ where: { id } })
        const { offer_id, companyName, companyTag, dateReady, isDocSigned, isDocRequested, status } = req.body
        try {


            offer.update({ offer_id, companyName, companyTag, dateReady, isDocSigned, isDocRequested, status }, { where: { id } })

            console.log("Updated Offer: ", offer.dataValues);
            return res.json(offer)

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }


    async delete(req, res, next) {
        const { id } = req.params
        try {
            const item = await OffList.findOne({ where: { id: id } })
            item.destroy()
            return res.json(item)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async deleteAll(req, res, next) {

        try {
            await OffList.destroy({ truncate: true, cascade: true })
            console.log("OffersList cleared!");
        } catch (error) {
            console.log('#######', error.message)
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new CkoOffersController() 