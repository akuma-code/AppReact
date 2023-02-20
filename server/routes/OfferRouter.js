const Router = require('express');
const router = new Router();
const CkoOffersController = require("../controllers/CkoOffersControl/CkoOffersControl");

router.post('/', CkoOffersController.create)
router.post('/list', CkoOffersController.createList)
router.get('/', CkoOffersController.getAll)
router.get('/:status', CkoOffersController.getAllByStatus)
router.get('/:id', CkoOffersController.getOne)
router.put('/:id', CkoOffersController.edit)
router.delete('/:id/delete', CkoOffersController.delete)
router.delete('/delete/:status', CkoOffersController.deleteByStatus)
router.delete('/delete', CkoOffersController.deleteAll)


module.exports = router