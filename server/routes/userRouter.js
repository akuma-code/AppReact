const Router = require('express')
const router = new Router();
const userController = require('../controllers/userController')
const authMiddleWare = require('../middleware/authMiddleWare')

router.post('/reg', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleWare, userController.check)
router.get('/', userController.getAll)
router.get('/:id', userController.getOne)

module.exports = router

