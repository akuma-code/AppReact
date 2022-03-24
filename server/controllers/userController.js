const ApiError = require('../Error/ApiError')

class userController {
    async registration(req, res) {

    }
    async login(req, res) {

    }
    async check(req, res, next) {

        const { id } = req.query
        if (!id) return next(ApiError.badRequest('Не указан ID'))
        res.json(id)
    }
}

module.exports = new userController()