const ApiError = require('../Error/ApiError')
const { User, Basket } = require('../models/ProdModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJWT = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}
class userController {
    async registration(req, res, next) {
        const { name, password, role = 'ADMIN' } = req.body
        if (!name || !password) {
            return next(ApiError.badRequest('Incorrect email or pass'))
        }
        const candidate = await User.findOne({ where: { name } })
        if (candidate) {
            return next(ApiError.badRequest('User already exist'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ name, role, password: hashPassword })
        const basket = await Basket.create({ userId: user.id })
        const token = generateJWT(user.id, user.name, user.role)


        return res.json({ token })
    }
    async getAll(req, res, next) {
        try {
            const allUsers = User.findAndCountAll()
            return res.json(allUsers.rows)
        } catch (e) {
            next(e)
        }
    }

    async getOne(req, res) {
        const { id } = req.params
        const user = await User.findOne({ where: { id } })
        return res.json(user)
    }

    async login(req, res, next) {
        const { name, password } = req.body
        const user = await User.findOne({ where: { name } })
        if (!user) {
            return next(ApiError.internal('User not found'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest('PASSWORD INCORRECT!'))
        }

        const token = generateJWT(user.name, user.id, user.role)
        return res.json({ token })
    }



    async check(req, res, next) {
        const token = generateJWT(req.user.id, req.user.name, req.user.role)
        return res.json({ token })
    }
}

module.exports = new userController()