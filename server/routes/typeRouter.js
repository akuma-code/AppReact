const Router = require('express');
const router = new Router();
const TypeController = require("../controllers/typeController");
const checkRoleMiddleWare = require('../middleware/checkRoleMiddleWare')


router.post('/', TypeController.create)
router.get('/', TypeController.getAll)
router.get('/info', TypeController.getAllInfo)
router.get('/:id', TypeController.getOne)
router.delete('/:id', TypeController.delete)
router.delete('/', TypeController.deleteAll)
router.put('/:id', TypeController.edit)
router.put('/:id/s', TypeController.editSec)

module.exports = router