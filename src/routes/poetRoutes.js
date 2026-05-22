const express = require('express');
const router = express.Router();
const poetController = require('../controllers/poetController');

// Rutas para Poets
router.get('/', poetController.getAllPoets);
router.get('/:id', poetController.getPoetById);
router.post('/', poetController.createPoet);
router.put('/:id', poetController.updatePoet);
router.delete('/:id', poetController.deletePoet);
router.get('/:id/poems', poetController.getPoetPoems);

module.exports = router;
