let express = require('express');
let controller = require('../controller/controller.js');
let router = express.Router();

let {
    getIndex
} = controller;
router.get('/', getIndex)

module.exports = router;