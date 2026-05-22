const db = require('../database/db-rest');

class Poet {
    // Obtener todos los poetas
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM Poet');
        return rows;
    }

    // Obtener un poeta por ID
    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM Poet WHERE poet_code = ?', [id]);
        return rows[0];
    }

    // Crear un nuevo poeta
    static async create(poetData) {
        const { first_name, surname, address, postcode, telephone_number } = poetData;
        const [result] = await db.query(
            'INSERT INTO Poet (first_name, surname, address, postcode, telephone_number) VALUES (?, ?, ?, ?, ?)',
            [first_name, surname, address, postcode, telephone_number]
        );
        return result.insertId;
    }

    // Actualizar un poeta
    static async update(id, poetData) {
        const { first_name, surname, address, postcode, telephone_number } = poetData;
        const [result] = await db.query(
            'UPDATE Poet SET first_name = ?, surname = ?, address = ?, postcode = ?, telephone_number = ? WHERE poet_code = ?',
            [first_name, surname, address, postcode, telephone_number, id]
        );
        return result.affectedRows;
    }

    // Eliminar un poeta
    static async delete(id) {
        const [result] = await db.query('DELETE FROM Poet WHERE poet_code = ?', [id]);
        return result.affectedRows;
    }

    // Obtener todos los poemas de un poeta
    static async getPoems(id) {
        const [rows] = await db.query(
            'SELECT * FROM Poem WHERE poet_code = ?',
            [id]
        );
        return rows;
    }
}

module.exports = Poet;
