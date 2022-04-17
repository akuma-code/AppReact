const Router = require('express');
const router = new Router();
const prodQueryController = require('../controllers/prodQueryController')

router.post('/', prodQueryController.start)

module.exports = router