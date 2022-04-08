let mysql = require('mysql');
let dbConfig = require('../config/dbConfig.js');

let connection = mysql.createConnection(dbConfig);

function queryFn(sql, bindData) {
    return new Promise((resolve, reject) => {
        connection.query(sql, bindData, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    })
}

module.exports = queryFn;