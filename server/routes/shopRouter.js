const Router = require('express');
const router = new Router();
const ShopController = require("../controllers/shopController");


router.post('/', ShopController.create)
router.get('/', ShopController.getAll)
router.get('/:id', ShopController.getOne)
router.delete('/:id', ShopController.delete)
router.get('/sort', ShopController.getSorted)

module.exports = router