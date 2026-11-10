const db = require('../config/db');

class MetodeDistribusiModel {
    static pilihMetodeDistribusi(data) {
        const stmt = db.prepare(`
            INSERT INTO metode_distribusi_surplus (id_surplus, jenis_distribusi, harga)
            VALUES (?, ?, ?)
        `);
        stmt.run(data.idSurplus, data.jenisDistribusi, data.harga || 0);
    }
}
module.exports = MetodeDistribusiModel;