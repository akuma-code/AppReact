const ApiError = require('../Error/ApiError')

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ ApiError: err.message })
    }
    return res.status(500).json({ message: "Хер знает, чего там сломалось!" })
}