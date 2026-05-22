const db = require('../database/db-rest');

class Publication {
    // Obtener todas las publicaciones
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM Publication');
        return rows;
    }

    // Obtener una publicación por ID
    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM Publication WHERE publication_code = ?', [id]);
        return rows[0];
    }

    // Crear una nueva publicación
    static async create(publicationData) {
        const { title, price } = publicationData;
        const [result] = await db.query(
            'INSERT INTO Publication (title, price) VALUES (?, ?)',
            [title, price]
        );
        return result.insertId;
    }

    // Actualizar una publicación
    static async update(id, publicationData) {
        const { title, price } = publicationData;
        const [result] = await db.query(
            'UPDATE Publication SET title = ?, price = ? WHERE publication_code = ?',
            [title, price, id]
        );
        return result.affectedRows;
    }

    // Eliminar una publicación
    static async delete(id) {
        const [result] = await db.query('DELETE FROM Publication WHERE publication_code = ?', [id]);
        return result.affectedRows;
    }

    // Obtener todos los poemas de una publicación
    static async getPoems(id) {
        const [rows] = await db.query(`
            SELECT p.*, po.first_name, po.surname
            FROM Poem p
            JOIN Poem_Publication pp ON p.poem_code = pp.poem_code
            JOIN Poet po ON p.poet_code = po.poet_code
            WHERE pp.publication_code = ?
        `, [id]);
        return rows;
    }

    // Agregar un poema a una publicación
    static async addPoem(publication_code, poem_code) {
        const [result] = await db.query(
            'INSERT INTO Poem_Publication (publication_code, poem_code) VALUES (?, ?)',
            [publication_code, poem_code]
        );
        return result.affectedRows;
    }

    // Eliminar un poema de una publicación
    static async removePoem(publication_code, poem_code) {
        const [result] = await db.query(
            'DELETE FROM Poem_Publication WHERE publication_code = ? AND poem_code = ?',
            [publication_code, poem_code]
        );
        return result.affectedRows;
    }
}

module.exports = Publication;
