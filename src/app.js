const path = require('path');
const express = require('express');
const initDatabase = require('./database/init');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));    

app.use(require('./config/sesi'));
app.use(require('./middleware/pengguna'));

initDatabase();

app.use('/', require('./routes/masuk'));

app.get('/', (req, res) => {
    res.render('I01-SelamatDatang');
});

app.use('/ngo', require('./routes/ngo'));
app.use('/daftar', require('./routes/auth'));
app.use('/status', require('./routes/status'));
app.use('/fnb', require('./routes/fnb'));
app.use('/admin', require('./routes/admin'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});