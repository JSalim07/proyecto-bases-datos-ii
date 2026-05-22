const db = require('../database/db-rest');

class Customer {
    // Obtener todos los clientes
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM Customer');
        return rows;
    }

    // Obtener un cliente por ID
    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM Customer WHERE customer_code = ?', [id]);
        return rows[0];
    }

    // Crear un nuevo cliente
    static async create(customerData) {
        const { first_name, surname, address, postcode, telephone_number } = customerData;
        const [result] = await db.query(
            'INSERT INTO Customer (first_name, surname, address, postcode, telephone_number) VALUES (?, ?, ?, ?, ?)',
            [first_name, surname, address, postcode, telephone_number]
        );
        return result.insertId;
    }

    // Actualizar un cliente
    static async update(id, customerData) {
        const { first_name, surname, address, postcode, telephone_number } = customerData;
        const [result] = await db.query(
            'UPDATE Customer SET first_name = ?, surname = ?, address = ?, postcode = ?, telephone_number = ? WHERE customer_code = ?',
            [first_name, surname, address, postcode, telephone_number, id]
        );
        return result.affectedRows;
    }

    // Eliminar un cliente
    static async delete(id) {
        const [result] = await db.query('DELETE FROM Customer WHERE customer_code = ?', [id]);
        return result.affectedRows;
    }

    // Obtener todas las ventas de un cliente
    static async getSales(id) {
        const [rows] = await db.query(`
            SELECT * FROM Sale WHERE customer_code = ?
        `, [id]);
        return rows;
    }
}

module.exports = Customer;
