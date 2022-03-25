const Router = require('express');
const router = new Router();
const TypeController = require("../controllers/typeController");
const checkRoleMiddleWare = require('../middleware/checkRoleMiddleWare')


router.post('/', checkRoleMiddleWare("ADMIN"), TypeController.create)
router.get('/', TypeController.getAll)
router.get('/:id', TypeController.getOne)
router.delete('/:id', checkRoleMiddleWare("ADMIN"), TypeController.delete)

module.exports = router