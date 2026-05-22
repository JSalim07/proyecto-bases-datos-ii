const db = require('../database/db-rest');

class Poem {
    // Obtener todos los poemas
    static async getAll() {
        const [rows] = await db.query(`
            SELECT p.*, po.first_name, po.surname
            FROM Poem p
            JOIN Poet po ON p.poet_code = po.poet_code
        `);
        return rows;
    }

    // Obtener un poema por ID
    static async getById(id) {
        const [rows] = await db.query(`
            SELECT p.*, po.first_name, po.surname
            FROM Poem p
            JOIN Poet po ON p.poet_code = po.poet_code
            WHERE p.poem_code = ?
        `, [id]);
        return rows[0];
    }

    // Crear un nuevo poema
    static async create(poemData) {
        const { poem_title, poem_contents, poet_code } = poemData;
        const [result] = await db.query(
            'INSERT INTO Poem (poem_title, poem_contents, poet_code) VALUES (?, ?, ?)',
            [poem_title, poem_contents, poet_code]
        );
        return result.insertId;
    }

    // Actualizar un poema
    static async update(id, poemData) {
        const { poem_title, poem_contents, poet_code } = poemData;
        const [result] = await db.query(
            'UPDATE Poem SET poem_title = ?, poem_contents = ?, poet_code = ? WHERE poem_code = ?',
            [poem_title, poem_contents, poet_code, id]
        );
        return result.affectedRows;
    }

    // Eliminar un poema
    static async delete(id) {
        const [result] = await db.query('DELETE FROM Poem WHERE poem_code = ?', [id]);
        return result.affectedRows;
    }

    // Obtener publicaciones donde aparece el poema
    static async getPublications(id) {
        const [rows] = await db.query(`
            SELECT pub.*
            FROM Publication pub
            JOIN Poem_Publication pp ON pub.publication_code = pp.publication_code
            WHERE pp.poem_code = ?
        `, [id]);
        return rows;
    }
}

module.exports = Poem;
