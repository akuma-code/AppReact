const SettingsController = require('../controllers/SettingsController');
const Router = require('express');
const router = new Router();

router.post('/reset', SettingsController.reset)
router.post('/set_host', SettingsController.setHostUrl)
router.get('/edit?:param', SettingsController.getOptions)
router.get('/get_host', SettingsController.getHostUrl)
router.get('/reset_models', SettingsController.initModels)


module.exports = router