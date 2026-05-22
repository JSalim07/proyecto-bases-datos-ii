const Poem = require('../models/poemModel');

exports.getAllPoems = async (req, res) => {
    try {
        const poems = await Poem.getAll();
        res.json({ success: true, count: poems.length, data: poems });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching poems', error: error.message });
    }
};

exports.getPoemById = async (req, res) => {
    try {
        const poem = await Poem.getById(req.params.id);
        if (!poem) return res.status(404).json({ success: false, message: 'Poem not found' });
        res.json({ success: true, data: poem });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching poem', error: error.message });
    }
};

exports.createPoem = async (req, res) => {
    try {
        const poemId = await Poem.create(req.body);
        const newPoem = await Poem.getById(poemId);
        res.status(201).json({ success: true, message: 'Poem created successfully', data: newPoem });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating poem', error: error.message });
    }
};

exports.updatePoem = async (req, res) => {
    try {
        const affectedRows = await Poem.update(req.params.id, req.body);
        if (affectedRows === 0) return res.status(404).json({ success: false, message: 'Poem not found' });
        const updatedPoem = await Poem.getById(req.params.id);
        res.json({ success: true, message: 'Poem updated successfully', data: updatedPoem });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating poem', error: error.message });
    }
};

exports.deletePoem = async (req, res) => {
    try {
        const affectedRows = await Poem.delete(req.params.id);
        if (affectedRows === 0) return res.status(404).json({ success: false, message: 'Poem not found' });
        res.json({ success: true, message: 'Poem deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting poem', error: error.message });
    }
};

exports.getPoemPublications = async (req, res) => {
    try {
        const publications = await Poem.getPublications(req.params.id);
        res.json({ success: true, count: publications.length, data: publications });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching poem publications', error: error.message });
    }
};
