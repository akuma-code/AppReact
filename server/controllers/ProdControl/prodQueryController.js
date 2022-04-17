const ApiError = require("../../Error/ApiError")

class ProdQueryController {
    async start(req, res, next) {
        try {
            const query = req.body
            console.log('>>>>>>>>>>>>>>>>>>query :>> ', query);


            return res.json(query)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }

}

module.exports = new ProdQueryController()