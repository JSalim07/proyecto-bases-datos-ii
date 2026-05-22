const express = require('express');
const router = express.Router();
const poemController = require('../controllers/poemController');

router.get('/', poemController.getAllPoems);
router.get('/:id', poemController.getPoemById);
router.post('/', poemController.createPoem);
router.put('/:id', poemController.updatePoem);
router.delete('/:id', poemController.deletePoem);
router.get('/:id/publications', poemController.getPoemPublications);

module.exports = router;
