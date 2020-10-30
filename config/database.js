// PostgreSQL library
const pgp = require('pg-promise')(/*option*/)

var env = process.env.NODE_ENV
var cn = null;

if (env === "production") {
    console.log("this is production database");
    // Production
    cn = {
        host: 'localhost', // 'localhost' is the default;
        port: 5432, // 5432 is the default;
        database: 'libraryDB',
        user: 'admin',
        password: 'Pa$$w0rd'
        //     password: '3DwR^4Sy#&'
    };
} else if (env === "test") {
    console.log("this is testing database");
    // Testing
    cn = {
        host: 'localhost', // 'localhost' is the default;
        port: 5432, // 5432 is the default;
        database: 'libraryDBTesting',
        user: 'admin',
        password: 'Pa$$w0rd'
        //     password: '3DwR^4Sy#&'
    };
}


const db = pgp(cn);

module.exports = db;