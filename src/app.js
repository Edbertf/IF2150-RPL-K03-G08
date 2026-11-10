const path = require('path');
const express = require('express');
const initDatabase = require('./database/init');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));    
app.use(express.json());

initDatabase(); 
//login sementara
app.use((req, res, next) => {
    req.user = { idPemilik: 1, role: 'pemilik_fnb', namaUsaha: 'Bakery Sinar Pagi' };
    next();
});

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/surplus', require('./routes/surplus'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});