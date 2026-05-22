const express = require('express');
const router = express.Router();
const StoredProceduresController = require('../controllers/storedProceduresController');

// Rutas para procedimientos almacenados
router.get('/poet-poems/:id', StoredProceduresController.getPoetWithPoems);
router.get('/sale-customer/:id', StoredProceduresController.getSaleWithCustomer);
router.get('/publication-poems/:id', StoredProceduresController.getPublicationWithPoems);

module.exports = router;
