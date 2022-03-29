const Router = require('express')
const router = new Router();
const oknoController = require('../controllers/oknoController')
const TypeController = require('../controllers/typeController')

router.post('/', TypeController.create)
router.get('/', TypeController.getAll)
router.get('/:id', TypeController.getOne)
router.delete('/:id', TypeController.delete)

module.exports = router