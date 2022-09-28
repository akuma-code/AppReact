const ApiError = require("../Error/ApiError")

const ROOTPASS = () => process.env.ROOT_PASS || "draksd1e"


function check(user_pass) {
    const root_pass = ROOTPASS()
    const isEqual = user_pass === root_pass
    return isEqual
}
class RootController {
    async login(req, res, next) {
        const { password } = req.body
        let comparePassword = check(password)
        const isAuth = comparePassword ? true : false
        console.log(isAuth);

        res.json(isAuth)
    }



}

module.exports = new RootController()