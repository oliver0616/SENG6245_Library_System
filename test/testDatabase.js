// PostgreSQL library
const pgp = require('pg-promise')(/*option*/)

// Testing
const cn = {
    host: 'localhost', // 'localhost' is the default;
    port: 5432, // 5432 is the default;
    database: 'libraryDBTesting',
    user: 'admin',
    password: 'Pa$$w0rd'
    //     password: '3DwR^4Sy#&'
};



const db = pgp(cn);

module.exports = db;