const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');

router.get('/', livroController.index);
router.get('/create', livroController.createForm);
router.post('/create', livroController.create);
router.get('/edit/:isbn', livroController.editForm);
router.post('/edit/:isbn', livroController.update);
router.post('/delete/:isbn', livroController.remove);

module.exports = router;