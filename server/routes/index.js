const Router = require('express')
const router = new Router();


const userRouter = require('./userRouter')
const skladRouter = require('./skladRouter')
const typeRouter = require('./typeRouter')
const shopRouter = require('./shopRouter')
const pQueryRouter = require('./pQueryRouter')


router.use('/user', userRouter)
router.use('/shop', shopRouter)
router.use('/type', typeRouter)
router.use('/sklad', skladRouter)
router.use('/prod', pQueryRouter)
router.use('/nets', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

module.exports = router