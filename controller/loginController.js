let query = require('../mysql/connection.js');


let loginController = {
    // 登录页面
    getLogin(req, res) {
        res.render('login')
    },
}



module.exports = loginController;