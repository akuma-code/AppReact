const Router = require('express');
const WhProdInfoController = require('../controllers/OGOControl/WhProdInfoController');
const os = require("os");
const router = new Router();
router.get('/', WhProdInfoController.getAll)
router.post('/start', WhProdInfoController.start)
router.delete('/clean', WhProdInfoController.cleanUp)
router.post('/start_and_remove', WhProdInfoController.startAndRemove)
router.put('/:id/fin', WhProdInfoController.finish)
router.put('/:id/fin_and_res', WhProdInfoController.finishAndRestore)
router.post('/autocomplete/:days', WhProdInfoController.AUTO_COMPLETE)
router.get('/host', async (req, res) => {
    const host = `http://${os.hostname}:${process.env.PORT}`
    res.json(host)
})
module.exports = router