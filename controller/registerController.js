let query = require('../mysql/connection.js');

let registerController = {
    register(req, res) {
        res.render('register')
    }
}

registerController.registerData = async (req, res) => {
    let {
        username,
        password,
        author,
        intro
    } = req.body;
    let sql = `insert into users (username,password,intro) values ('${username}','${password}','${intro}')`;
    let data = await query(sql);
    if (data.affectedRows > 0) {
        res.json({
            code: 0,
            message: '注册成功'
        })
    }
}

module.exports = registerController;