const Router = require('express')
const router = new Router();
const userRouter = require('./userRouter')
const skladRouter = require('./skladRouter')
const oknoRouter = require('./oknoRouter')



router.use('/user', userRouter)
router.use('/sklad', skladRouter)
router.use('/okno', oknoRouter)

module.exports = router