const crypto = require('crypto');
const session = require('express-session');

const RAHASIA = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');

module.exports = session({
    name: 'foodlink.sid',
    secret: RAHASIA,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 8 * 60 * 60 * 1000
    }
});