const ApiError = require('../Error/ApiError')

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        if (req.body) console.log(req.body);
        return res.status(err.status).json({ ApiError: err.message })
    }
    return res.status(500).json({ message: "Хер знает, чего там сломалось!" })
}