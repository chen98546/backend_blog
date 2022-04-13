// 主页控制器

let query = require('../mysql/connection.js');

let indexController = {
    // 后台主页
    getIndex(req, res) {
        res.render('index') // 用户名 , {'uname': req.session.record.username}
    },
    // 登录页面
    getLogin(req, res) {
        res.render('login')
    }
}


// 获取
indexController.getIndexData = async (req, res) => {
    let sql = `select * from article`;
    let data = await query(sql);
    res.json(data);
}



module.exports = indexController;