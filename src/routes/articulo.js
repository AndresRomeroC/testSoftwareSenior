const router = require('express').Router();

const articuloController = require('../controllers/articuloController');

router.get('/', articuloController.list);
router.post('/add', articuloController.save);
router.get('/update/:id', articuloController.edit);
router.post('/update/:id', articuloController.update);
router.get('/delete/:id', articuloController.delete);

module.exports = router;