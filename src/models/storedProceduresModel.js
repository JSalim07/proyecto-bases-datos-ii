const db = require('../database/db-rest');

class StoredProceduresModel {

    // Procedimiento 1: Poeta con sus Poemas
    static async getPoetWithPoems(poetCode) {
        const [rows] = await db.query('CALL sp_GetPoetWithPoems(?)', [poetCode]);
        return rows[0]; // El resultado está en el primer elemento
    }

    // Procedimiento 2: Venta con Cliente
    static async getSaleWithCustomer(saleCode) {
        const [rows] = await db.query('CALL sp_GetSaleWithCustomer(?)', [saleCode]);
        return rows[0];
    }

    // Procedimiento 3: Publicación con Poemas
    static async getPublicationWithPoems(publicationCode) {
        const [rows] = await db.query('CALL sp_GetPublicationWithPoems(?)', [publicationCode]);
        return rows[0];
    }
}

module.exports = StoredProceduresModel;
