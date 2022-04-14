let query = require('../mysql/connection.js');

let userController = {}

userController.getUserData = async (req, res) => {
    let sql = 'select * from  users';
    let data = await query(sql)
    res.json(data)
}

module.exports = userController;