const Router = require('express');
const ogoController = require("../controllers/OGOControl/ogoController");
const router = new Router();

router.put('/', ogoController.editALL)

module.exports = router