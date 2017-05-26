const mysql = require('mysql');

module.export const = mysql.createConnection({
    host     : 'localhost',
    user     : 'dbuser',
    password : 's3kreee7',
    database : 'my_db'
});