const Customer = require('../models/customerModel');

exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.getAll();
        res.json({ success: true, count: customers.length, data: customers });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching customers', error: error.message });
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.getById(req.params.id);
        if (!customer) return res.status(404).json({ success: false, message: 'Customer not found' });
        res.json({ success: true, data: customer });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching customer', error: error.message });
    }
};

exports.createCustomer = async (req, res) => {
    try {
        const customerId = await Customer.create(req.body);
        const newCustomer = await Customer.getById(customerId);
        res.status(201).json({ success: true, message: 'Customer created successfully', data: newCustomer });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating customer', error: error.message });
    }
};

exports.updateCustomer = async (req, res) => {
    try {
        const affectedRows = await Customer.update(req.params.id, req.body);
        if (affectedRows === 0) return res.status(404).json({ success: false, message: 'Customer not found' });
        const updatedCustomer = await Customer.getById(req.params.id);
        res.json({ success: true, message: 'Customer updated successfully', data: updatedCustomer });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating customer', error: error.message });
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        const affectedRows = await Customer.delete(req.params.id);
        if (affectedRows === 0) return res.status(404).json({ success: false, message: 'Customer not found' });
        res.json({ success: true, message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting customer', error: error.message });
    }
};

exports.getCustomerSales = async (req, res) => {
    try {
        const sales = await Customer.getSales(req.params.id);
        res.json({ success: true, count: sales.length, data: sales });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching customer sales', error: error.message });
    }
};
