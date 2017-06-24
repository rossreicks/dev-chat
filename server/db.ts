import * as mysql from 'mysql';

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'chat'
});

db.connect( err => {
    if (err) {
        throw err;
    }
});

export { db };