const Router = require('express');
const router = new Router();
const OfferController = require("../controllers/OfferControl/OfferController");

router.post('/', OfferController.create)
router.get('/', OfferController.getAll)

module.exports = router