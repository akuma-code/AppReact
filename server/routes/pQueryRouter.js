const Router = require('express');
const router = new Router();
const ProdQueryController = require('../controllers/ProdControl/prodQueryController')
const skladController = require('../controllers/ProdControl/skladController')

router.get('/', ProdQueryController.getAll)
router.get('/test', ProdQueryController.getTest)
router.post('/test', ProdQueryController.getTest)
router.get('/query', ProdQueryController.getQuery)
router.get('/fin', ProdQueryController.getFinished)
router.get('/work', ProdQueryController.getProdUnfinished)
router.put('/set', ProdQueryController.setQuant)
router.get('/:id', ProdQueryController.getOne)
router.put('/:id/fin', ProdQueryController.finishTask)
router.post('/', ProdQueryController.start)
router.delete('/', ProdQueryController.clearALL)

module.exports = router