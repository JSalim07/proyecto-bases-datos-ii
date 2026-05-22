const Sale = require('../models/saleModel');

exports.getAllSales = async (req, res) => {
    try {
        const sales = await Sale.getAll();
        res.json({ success: true, count: sales.length, data: sales });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching sales', error: error.message });
    }
};

exports.getSaleById = async (req, res) => {
    try {
        const sale = await Sale.getById(req.params.id);
        if (!sale) return res.status(404).json({ success: false, message: 'Sale not found' });
        res.json({ success: true, data: sale });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching sale', error: error.message });
    }
};

exports.createSale = async (req, res) => {
    try {
        const saleId = await Sale.create(req.body);
        const newSale = await Sale.getById(saleId);
        res.status(201).json({ success: true, message: 'Sale created successfully', data: newSale });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating sale', error: error.message });
    }
};

exports.updateSale = async (req, res) => {
    try {
        const affectedRows = await Sale.update(req.params.id, req.body);
        if (affectedRows === 0) return res.status(404).json({ success: false, message: 'Sale not found' });
        const updatedSale = await Sale.getById(req.params.id);
        res.json({ success: true, message: 'Sale updated successfully', data: updatedSale });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating sale', error: error.message });
    }
};

exports.deleteSale = async (req, res) => {
    try {
        const affectedRows = await Sale.delete(req.params.id);
        if (affectedRows === 0) return res.status(404).json({ success: false, message: 'Sale not found' });
        res.json({ success: true, message: 'Sale deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting sale', error: error.message });
    }
};

exports.getSalePublications = async (req, res) => {
    try {
        const publications = await Sale.getPublications(req.params.id);
        res.json({ success: true, count: publications.length, data: publications });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching sale publications', error: error.message });
    }
};

exports.addPublicationToSale = async (req, res) => {
    try {
        await Sale.addPublication(req.params.id, req.body.publication_code);
        res.json({ success: true, message: 'Publication added to sale successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding publication to sale', error: error.message });
    }
};

exports.removePublicationFromSale = async (req, res) => {
    try {
        await Sale.removePublication(req.params.id, req.params.publicationId);
        res.json({ success: true, message: 'Publication removed from sale successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error removing publication from sale', error: error.message });
    }
};
