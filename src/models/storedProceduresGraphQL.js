// Este modelo usa la conexión mysql2 directa para GraphQL
const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

// Crear pool de conexiones
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3308,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

class StoredProceduresGraphQL {

    // Procedimiento 1: Poeta con sus Poemas
    static async getPoetWithPoems(poetCode) {
        const [rows] = await pool.query('CALL sp_GetPoetWithPoems(?)', [poetCode]);
        return rows[0]; // El resultado está en el primer elemento
    }

    // Procedimiento 2: Venta con Cliente
    static async getSaleWithCustomer(saleCode) {
        const [rows] = await pool.query('CALL sp_GetSaleWithCustomer(?)', [saleCode]);
        return rows[0];
    }

    // Procedimiento 3: Publicación con Poemas
    static async getPublicationWithPoems(publicationCode) {
        const [rows] = await pool.query('CALL sp_GetPublicationWithPoems(?)', [publicationCode]);
        return rows[0];
    }
}

module.exports = StoredProceduresGraphQL;
