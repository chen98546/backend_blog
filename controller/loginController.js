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
    let sql = 'select * from users';
    let data = await query(sql);


    let result = data.find(item => {

        let {
            username: u,
            password: p
        } = item;
        if (u === username && p === password) {
            return true;
        } else {
            return false;
        }

    })

    if (result) {
        req.session.record = result;
        res.redirect('/')
    } else {
        res.redirect('/login')
    }

}


// 退出清空所有session数据
loginController.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            throw err;
        }
    })
    res.send('退出')
}


module.exports = loginController;