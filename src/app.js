const path = require('path');
const express = require('express');
const initDatabase = require('./database/init');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));    
app.use(express.static(path.join(__dirname, 'public')));

initDatabase(); 
//login sementara
app.use((req, res, next) => {
    if (req.path.startsWith('/admin')) {
        req.user = { idAkun: 2, role: 'admin_sistem', nama: 'Admin Sistem' };
        return next();
    }

    req.user = { idPemilik: 1, role: 'pemilik_fnb', namaUsaha: 'Bakery Sinar Pagi' };
    next();
});

app.get('/', (req, res) => {
    res.render('I01-SelamatDatang');
});

app.use('/fnb', require('./routes/fnb'));
app.use('/daftar', require('./routes/auth'));
app.use('/admin/log', require('./routes/log'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});