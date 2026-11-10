const fs = require('fs');
const path = require('path');
const db = require('../config/db');

const SCHEMA_DIR = path.join(__dirname, 'schema');

const initDatabase = () => {
    const files = fs
        .readdirSync(SCHEMA_DIR)
        .filter((file) => file.endsWith('.sql'))
        .sort();

    for (const file of files) {
        const sql = fs.readFileSync(path.join(SCHEMA_DIR, file), 'utf8');
        db.exec(sql);
    }

    console.log(`Database diinisialisasi dari ${files.length} file schema.`);
};

module.exports = initDatabase;
