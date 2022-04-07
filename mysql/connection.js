let mysql = require('mysql');
let dbConfig = require('../config/dbConfig.js');

let connection = mysql.createConnection(dbConfig);

function queryFn(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    })
}

module.exports = queryFn;