const StoredProceduresModel = require('../models/storedProceduresModel');

class StoredProceduresController {

    // GET /api/stored-procedures/poet-poems/:id
    static async getPoetWithPoems(req, res) {
        try {
            const poetCode = req.params.id;
            const result = await StoredProceduresModel.getPoetWithPoems(poetCode);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // GET /api/stored-procedures/sale-customer/:id
    static async getSaleWithCustomer(req, res) {
        try {
            const saleCode = req.params.id;
            const result = await StoredProceduresModel.getSaleWithCustomer(saleCode);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // GET /api/stored-procedures/publication-poems/:id
    static async getPublicationWithPoems(req, res) {
        try {
            const publicationCode = req.params.id;
            const result = await StoredProceduresModel.getPublicationWithPoems(publicationCode);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = StoredProceduresController;
