let express = require('express');
let controller = require('../controller/controller.js');
let router = express.Router();

let {
    getIndex,
    getLogin,
    getIndexData
} = controller;
router.get('/', getIndex)
router.get('/login', getLogin)


router.get('/getIndexData', getIndexData)



module.exports = router;