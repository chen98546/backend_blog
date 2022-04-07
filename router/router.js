let express = require('express');
let controller = require('../controller/controller.js');
let router = express.Router();

let {
    getIndex,
    getLogin
} = controller;
router.get('/', getIndex)
router.get('/login', getLogin)

module.exports = router;