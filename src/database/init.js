
const fs = require('fs');
const path = require('path');
const db = require('../config/db');

const SCHEMA_DIR = path.join(__dirname, 'schema');

const initDatabase = () => {
    if (!fs.existsSync(SCHEMA_DIR)) {
        throw new Error('Folder database/schema tidak ditemukan.');
    }

    const files = fs.readdirSync(SCHEMA_DIR)
        .filter((file) => file.endsWith('.sql'))
        .sort();

    if (files.length === 0) {
        throw new Error('Tidak ditemukan file schema SQL.');
    }

    const executeSchemas = db.transaction(() => {
        for (const file of files) {
            const schemaPath = path.join(SCHEMA_DIR, file);
            const sql = fs.readFileSync(schemaPath, 'utf8');

            db.exec(sql);
            console.log(`Schema berhasil dijalankan: ${file}`);
        }
    });

    executeSchemas();

    console.log(
        `Database berhasil diinisialisasi dari ${files.length} file schema.`
    );
};

module.exports = initDatabase;
