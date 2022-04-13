// 注册控制器

let md5 = require('md5')

let {
    pass_secret // 解构密钥
} = require('../config/pass_secret.js')
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
    password = md5(`${password}${pass_secret}`);
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