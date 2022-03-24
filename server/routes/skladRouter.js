const Router = require('express');
const router = new Router();
const skladController = require("../controllers/skladController");


router.get('/', skladController.getAll)
router.post('/', skladController.create)
router.get('/:id', skladController.getOne)
router.put('/:id', skladController.updateCount)
router.put('/:id/update', skladController.updateItem)
router.delete('/:id', skladController.deleteItem)

module.exports = router