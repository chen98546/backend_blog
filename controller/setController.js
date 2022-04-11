// 设置控制器

let query = require('../mysql/connection.js');

let setController = {
    // 设置页面
    settings(req, res) {
        res.render('settings')
    },
}

// 修改
setController.settingsPut = async (req, res) => {
    let {
        logoName
    } = req.body;
    let sql = `update settings set logoName='${logoName}'`;
    let data = await query(sql);
    res.json(data)
}


setController.amendForm = async (req, res) => {
    let {
        username
    } = req.body;
    console.log(username);
    let sql = `update settings set username='${username}'`;
    let data = await query(sql);
    res.json(data)
}

module.exports = setController;