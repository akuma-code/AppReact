const Router = require('express')
const router = new Router();
const userRouter = require('./userRouter')
const skladRouter = require('./skladRouter')
const oknoRouter = require('./oknoRouter')



router.use('/user', userRouter)
router.use('/okno', oknoRouter)
router.use('/ogo', skladRouter)

module.exports = router