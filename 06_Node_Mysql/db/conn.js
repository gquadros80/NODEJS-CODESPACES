const mysql     = require('mysql');

const comun      =mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "",
    database: "db_comum"
});

module.exports = comun;