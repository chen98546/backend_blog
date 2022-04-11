let md5 = require('md5')
let query = require('../mysql/connection.js');
let {
    pass_secret // 解构密钥
} = require('../config/pass_secret.js')

let loginController = {
    // 登录页面
    getLogin(req, res) {
        res.render('login')
    },
}

// 验证
loginController.loginData = async (req, res) => {
    let {
        username,
        password
    } = req.body;
    // 加密
    password = md5(`${password}${pass_secret}`)
    let sql = `select * from users where username='${username}' and password='${password}'`;
    let data = await query(sql)


    if (data.length > 0) {
        req.session.record = data[0];
        res.json({
            code: 0,
            message: '登录成功'
        })
    } else {
        res.json({
            code: 1,
            message: '用户名或密码错误'
        })
    }
}


// 退出清空所有session数据
loginController.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            throw err;
        }
    })
    res.send('退出登录')
}


module.exports = loginController;