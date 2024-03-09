const mysql = require('mysql2/promise');
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'Airtribe'
};
const pool = mysql.createPool(dbConfig);
module.exports = pool;
