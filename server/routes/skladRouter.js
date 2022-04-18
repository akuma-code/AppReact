const Router = require('express');
const router = new Router();
const skladController = require("../controllers/ProdControl/skladController");


router.post('/', skladController.create)
router.get('/', skladController.getAll)
router.get('/:id', skladController.getOne)
router.delete('/:id', skladController.delete)
router.delete('/', skladController.clearALL)

module.exports = router