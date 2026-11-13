const path = require('path');
const express = require('express');
const initDatabase = require('./database/init');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

initDatabase();

app.use(require('./config/sesi'));
app.use(require('./middleware/pengguna'));

app.use('/', require('./routes/masuk'));

app.get('/', (req, res) => {
    res.render('I01-SelamatDatang');
});

app.use('/admin', require('./routes/admin'));
app.use('/fnb', require('./routes/fnb'));
app.use('/ngo', require('./routes/ngo'));
app.use('/surplus', require('./routes/surplus'));
app.use('/daftar', require('./routes/auth'));
app.use('/status', require('./routes/status'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});
