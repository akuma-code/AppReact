const Router = require('express');
const WhProdInfoController = require('../controllers/OGOControl/WhProdInfoController');
const router = new Router();

router.get('/', WhProdInfoController.getAll)
router.post('/start', WhProdInfoController.start)
router.put('/:id/fin', WhProdInfoController.finish)

module.exports = router