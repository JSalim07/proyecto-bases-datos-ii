const db = require('../database/db-rest');

class Sale {
    // Obtener todas las ventas
    static async getAll() {
        const [rows] = await db.query(`
            SELECT s.*, c.first_name, c.surname
            FROM Sale s
            JOIN Customer c ON s.customer_code = c.customer_code
        `);
        return rows;
    }

    // Obtener una venta por ID
    static async getById(id) {
        const [rows] = await db.query(`
            SELECT s.*, c.first_name, c.surname
            FROM Sale s
            JOIN Customer c ON s.customer_code = c.customer_code
            WHERE s.sale_code = ?
        `, [id]);
        return rows[0];
    }

    // Crear una nueva venta
    static async create(saleData) {
        const { date, amount, customer_code } = saleData;
        const [result] = await db.query(
            'INSERT INTO Sale (date, amount, customer_code) VALUES (?, ?, ?)',
            [date, amount, customer_code]
        );
        return result.insertId;
    }

    // Actualizar una venta
    static async update(id, saleData) {
        const { date, amount, customer_code } = saleData;
        const [result] = await db.query(
            'UPDATE Sale SET date = ?, amount = ?, customer_code = ? WHERE sale_code = ?',
            [date, amount, customer_code, id]
        );
        return result.affectedRows;
    }

    // Eliminar una venta
    static async delete(id) {
        const [result] = await db.query('DELETE FROM Sale WHERE sale_code = ?', [id]);
        return result.affectedRows;
    }

    // Obtener todas las publicaciones de una venta
    static async getPublications(id) {
        const [rows] = await db.query(`
            SELECT pub.*
            FROM Publication pub
            JOIN Sale_Publication sp ON pub.publication_code = sp.publication_code
            WHERE sp.sale_code = ?
        `, [id]);
        return rows;
    }

    // Agregar una publicación a una venta
    static async addPublication(sale_code, publication_code) {
        const [result] = await db.query(
            'INSERT INTO Sale_Publication (sale_code, publication_code) VALUES (?, ?)',
            [sale_code, publication_code]
        );
        return result.affectedRows;
    }

    // Eliminar una publicación de una venta
    static async removePublication(sale_code, publication_code) {
        const [result] = await db.query(
            'DELETE FROM Sale_Publication WHERE sale_code = ? AND publication_code = ?',
            [sale_code, publication_code]
        );
        return result.affectedRows;
    }
}

module.exports = Sale;
