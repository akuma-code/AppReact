const Router = require('express')
const router = new Router();
const userRouter = require('./userRouter')
const skladRouter = require('./skladRouter')
const typeRouter = require('./typeRouter')
const amountRouter = require('./amountRouter');



router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/ogo', skladRouter)
router.use('/am', amountRouter)
router.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

module.exports = router