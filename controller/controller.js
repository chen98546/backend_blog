let path = require('path');
let query = require('../mysql/connection.js');


let controller = {
    getIndex(req, res) {
        res.sendFile(path.join(path.dirname(__dirname), 'views/index.html'));
    },
    getLogin(req, res) {
        res.sendFile(path.join(path.dirname(__dirname), 'views/login.html'));
    },

}

module.exports = controller;