const Router = require('express');
const router = new Router();
const ProdQueryController = require('../controllers/ProdControl/prodQueryController')
const skladController = require('../controllers/ProdControl/skladController')

router.get('/', ProdQueryController.getAll)
router.get('/query', ProdQueryController.getQuery)
router.get('/:id', ProdQueryController.getOne)
router.get('/fin', ProdQueryController.getFinished)
router.put('/:id/fin', ProdQueryController.finishTask)
router.post('/', ProdQueryController.start)
router.delete('/', ProdQueryController.clearALL)

module.exports = router