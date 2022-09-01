const Router = require('express');
const WarehouseController = require("../controllers/OGOControl/WarehouseController");
const router = new Router();
const skladController = require("../controllers/ProdControl/skladController");


router.post('/', skladController.create)
router.get('/wh/', WarehouseController.getAll)
router.post('/wh/', WarehouseController.create)
router.get('/', skladController.getAll)
router.get('/:id', skladController.getOne)
router.delete('/:id', skladController.delete)
router.delete('/wh/:id', WarehouseController.delete)
router.delete('/', skladController.clearALL)
router.put('/:id', skladController.update)
router.put('/wh/:id', WarehouseController.edit)
router.post('/:skladId/copy', WarehouseController.copySklad)


module.exports = router