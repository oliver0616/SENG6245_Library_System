// PostgreSQL library
const pgp = require('pg-promise')(/*option*/)

const cn = {
    host: 'localhost', // 'localhost' is the default;
    port: 5432, // 5432 is the default;
    database: 'libraryDB',
    user: 'admin',
    password: 'Pa$$w0rd'
    //     password: '3DwR^4Sy#&'
};

const db = pgp(cn);

module.exports = db;