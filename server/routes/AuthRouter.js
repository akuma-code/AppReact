const Router = require('express');
const rootController = require('../controllers/rootController');
const router = new Router();

router.post('/login', rootController.login)


module.exports = router