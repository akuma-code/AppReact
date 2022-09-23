const Router = require('express');
const WarehouseController = require("../controllers/OGOControl/WarehouseController");
const router = new Router();
const skladController = require("../controllers/ProdControl/skladController");


router.get('/wh/', WarehouseController.getAll)
router.post('/wh/', WarehouseController.create)
router.delete('/wh/del/', WarehouseController.deleteAll)
router.delete('/wh/:id/del', WarehouseController.delete)
router.put('/wh/:id', WarehouseController.edit)
router.post('/wh/:skladId/copy', WarehouseController.copySklad)
router.post('/', skladController.create)
router.get('/', skladController.getAll)
router.get('/:id', skladController.getOne)
router.delete('/:id', skladController.delete)
router.delete('/', skladController.clearALL)
router.put('/:id', skladController.update)
router.put('/:id/s', skladController.editSec)


module.exports = router