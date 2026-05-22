const Publication = require('../models/publicationModel');

exports.getAllPublications = async (req, res) => {
    try {
        const publications = await Publication.getAll();
        res.json({ success: true, count: publications.length, data: publications });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching publications', error: error.message });
    }
};

exports.getPublicationById = async (req, res) => {
    try {
        const publication = await Publication.getById(req.params.id);
        if (!publication) return res.status(404).json({ success: false, message: 'Publication not found' });
        res.json({ success: true, data: publication });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching publication', error: error.message });
    }
};

exports.createPublication = async (req, res) => {
    try {
        const publicationId = await Publication.create(req.body);
        const newPublication = await Publication.getById(publicationId);
        res.status(201).json({ success: true, message: 'Publication created successfully', data: newPublication });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating publication', error: error.message });
    }
};

exports.updatePublication = async (req, res) => {
    try {
        const affectedRows = await Publication.update(req.params.id, req.body);
        if (affectedRows === 0) return res.status(404).json({ success: false, message: 'Publication not found' });
        const updatedPublication = await Publication.getById(req.params.id);
        res.json({ success: true, message: 'Publication updated successfully', data: updatedPublication });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating publication', error: error.message });
    }
};

exports.deletePublication = async (req, res) => {
    try {
        const affectedRows = await Publication.delete(req.params.id);
        if (affectedRows === 0) return res.status(404).json({ success: false, message: 'Publication not found' });
        res.json({ success: true, message: 'Publication deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting publication', error: error.message });
    }
};

exports.getPublicationPoems = async (req, res) => {
    try {
        const poems = await Publication.getPoems(req.params.id);
        res.json({ success: true, count: poems.length, data: poems });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching publication poems', error: error.message });
    }
};

exports.addPoemToPublication = async (req, res) => {
    try {
        await Publication.addPoem(req.params.id, req.body.poem_code);
        res.json({ success: true, message: 'Poem added to publication successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding poem to publication', error: error.message });
    }
};

exports.removePoemFromPublication = async (req, res) => {
    try {
        await Publication.removePoem(req.params.id, req.params.poemId);
        res.json({ success: true, message: 'Poem removed from publication successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error removing poem from publication', error: error.message });
    }
};
