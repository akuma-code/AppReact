const Router = require('express')
const router = new Router();
const oknoController = require('../controllers/oknoController')

router.post('/', oknoController.create)
router.get('/', oknoController.getAll)
router.get('/:id', oknoController.getOne)
router.delete('/:id/delete', oknoController.delete)

module.exports = router