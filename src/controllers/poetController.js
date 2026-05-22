const Poet = require('../models/poetModel');

// GET /api/poets - Obtener todos los poetas
exports.getAllPoets = async (req, res) => {
    try {
        const poets = await Poet.getAll();
        res.json({
            success: true,
            count: poets.length,
            data: poets
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching poets',
            error: error.message
        });
    }
};

// GET /api/poets/:id - Obtener un poeta por ID
exports.getPoetById = async (req, res) => {
    try {
        const poet = await Poet.getById(req.params.id);
        if (!poet) {
            return res.status(404).json({
                success: false,
                message: 'Poet not found'
            });
        }
        res.json({
            success: true,
            data: poet
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching poet',
            error: error.message
        });
    }
};

// POST /api/poets - Crear un nuevo poeta
exports.createPoet = async (req, res) => {
    try {
        const poetId = await Poet.create(req.body);
        const newPoet = await Poet.getById(poetId);
        res.status(201).json({
            success: true,
            message: 'Poet created successfully',
            data: newPoet
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating poet',
            error: error.message
        });
    }
};

// PUT /api/poets/:id - Actualizar un poeta
exports.updatePoet = async (req, res) => {
    try {
        const affectedRows = await Poet.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Poet not found'
            });
        }
        const updatedPoet = await Poet.getById(req.params.id);
        res.json({
            success: true,
            message: 'Poet updated successfully',
            data: updatedPoet
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating poet',
            error: error.message
        });
    }
};

// DELETE /api/poets/:id - Eliminar un poeta
exports.deletePoet = async (req, res) => {
    try {
        const affectedRows = await Poet.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Poet not found'
            });
        }
        res.json({
            success: true,
            message: 'Poet deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting poet',
            error: error.message
        });
    }
};

// GET /api/poets/:id/poems - Obtener todos los poemas de un poeta
exports.getPoetPoems = async (req, res) => {
    try {
        const poems = await Poet.getPoems(req.params.id);
        res.json({
            success: true,
            count: poems.length,
            data: poems
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching poet poems',
            error: error.message
        });
    }
};
