let path = require('path');
let query = require('../mysql/connection.js');


let controller = {
    getIndex(req, res) {
        res.sendFile(path.join(path.dirname(__dirname), 'views/index.html'));
    },

    
}

module.exports = controller;