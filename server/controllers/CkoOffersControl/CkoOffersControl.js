const ApiError = require('../../Error/ApiError')
const GlobalOffersList = require('../../models/CkoOffersListModel.js')


class CkoOffersController {
    async create(req, res, next) {
        const new_offer = req.body
        const { offer_id, companyName, companyTag, dateReady, isDocSigned, isDocRequested, status } = new_offer
        try {
            const m = await GlobalOffersList.create(new_offer)
            console.log('Created Offer: ', m.dataValues)
            return res.json(m)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async createList(req, res, next) {
        const offersList = req.body
        console.log('offlist', offersList)
        try {
            const m = await GlobalOffersList.bulkCreate(offersList)
            console.log('Offers created: ', m.dataValues)
            return res.json(m)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }


    async getAll(req, res, next) {
        try {
            const offers = await GlobalOffersList.findAll()
            return res.json(offers)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
    async getAllByStatus(req, res, next) {
        const { status } = req.params
        try {
            const offers = await GlobalOffersList.findAll({ where: { status } })
            return res.json(offers)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }


    async getOne(req, res, next) {
        const { id } = req.params
        try {
            const offer = await GlobalOffersList.findOne({ where: { id } })
            return res.json(offer)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }


    async edit(req, res, next) {
        const { id } = req.params
        const offer = await GlobalOffersList.findOne({ where: { id } })
        const { offer_id, companyName, companyTag, dateReady, isDocSigned, isDocRequested, status } = req.body
        try {
            offer.update({ offer_id, companyName, companyTag, dateReady, isDocSigned, isDocRequest, status }, { where: { id } })
            console.log("Updated Offer: ", offer.dataValues);
            return res.json(offer)

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }


    async delete(req, res, next) {
        const { id } = req.params
        try {
            const item = await GlobalOffersList.findOne({ where: { id: id } })
            item.destroy()
            return res.json(item)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async deleteAll(req, res, next) {

        try {
            await GlobalOffersList.destroy({ truncate: true, cascade: true })
            console.log("OffersList cleared!");
        } catch (error) {
            console.log('#######', error.message)
            next(ApiError.badRequest(error.message))
        }
    }
    async deleteByStatus(req, res, next) {
        const { status } = req.params
        console.log(status);
        try {
            const items = await GlobalOffersList.findAll({ where: { status } })
            items.forEach(i => i.destroy())
            console.log("OffersList  cleared by status ", status);
        } catch (error) {
            console.log('#######', error.message)
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new CkoOffersController() 