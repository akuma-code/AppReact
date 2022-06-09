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

module.exports = router