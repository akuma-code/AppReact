const Router = require('express');
const router = new Router();
const ShopController = require("../controllers/shopController");


router.post('/', ShopController.create)
router.get('/', ShopController.getAll)
// router.get('/:id', ShopController.getOne)
// router.delete('/:id', ShopController.delete)

module.exports = router