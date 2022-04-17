const Router = require('express');
const router = new Router();
const ProdQueryController = require('../controllers/ProdControl/prodQueryController')
const skladController = require('../controllers/ProdControl/skladController')

router.get('/', skladController.getAll)

module.exports = router