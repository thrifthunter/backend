var mysql = require('mysql');

var con = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

module.exports = con;