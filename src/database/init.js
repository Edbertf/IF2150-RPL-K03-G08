const fs = require('fs');
const path = require('path');
const db = require('../config/db');

const SCHEMA_DIR = path.join(__dirname, 'schema');

const initDatabase = () => {
    // Memastikan folder schema tersedia.
    if (!fs.existsSync(SCHEMA_DIR)) {
        throw new Error('Folder database/schema tidak ditemukan.');
    }

    // Mengambil seluruh file SQL dan mengurutkannya.
    const schemaFiles = fs.readdirSync(SCHEMA_DIR)
        .filter((file) => file.endsWith('.sql'))
        .sort();

    if (schemaFiles.length === 0) {
        throw new Error('Tidak ditemukan file schema SQL.');
    }

    // Menjalankan seluruh schema dalam satu transaksi.
    const executeSchemas = db.transaction(() => {
        for (const file of schemaFiles) {
            const schemaPath = path.join(SCHEMA_DIR, file);
            const sql = fs.readFileSync(schemaPath, 'utf8');

            db.exec(sql);

            console.log(`Schema berhasil dijalankan: ${file}`);
        }
    });

    executeSchemas();

    console.log(
        `Database berhasil diinisialisasi dari ${schemaFiles.length} file schema.`
    );
};

module.exports = initDatabase;
