const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

router.get('/', saleController.getAllSales);
router.get('/:id', saleController.getSaleById);
router.post('/', saleController.createSale);
router.put('/:id', saleController.updateSale);
router.delete('/:id', saleController.deleteSale);
router.get('/:id/publications', saleController.getSalePublications);
router.post('/:id/publications', saleController.addPublicationToSale);
router.delete('/:id/publications/:publicationId', saleController.removePublicationFromSale);

module.exports = router;
