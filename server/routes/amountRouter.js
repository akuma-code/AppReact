const Router = require('express');
const router = new Router();
const AmountController = require("../controllers/amountController");


router.post('/', AmountController.create)
router.get('/', AmountController.getAll)
router.get('/:id', AmountController.getOne)
router.delete('/:id', AmountController.delete)
router.put('/:id', AmountController.update)

module.exports = router