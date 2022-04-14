// 设置控制器

let fs = require('fs');
let path = require('path');
let md5 = require('md5');

let {
    pass_secret
} = require('../config/pass_secret.js')
let query = require('../mysql/connection.js');

let setController = {
    // 设置页面
    settings(req, res) {
        res.render('settings') // 用户名 , {'uname': req.session.record.username}
    },
}

// logo名修改
setController.settingsPut = async (req, res) => {
    let {
        logoName
    } = req.body;
    let sql = `update settings set logoName='${logoName}'`;
    let data = await query(sql);
    res.json(data)
}

// 个人信息设置
setController.amendForm = async (req, res) => {
    let {
        username,
        avatar,
        pic,
        isEditUserInfo
    } = req.body;
    let {
        id
    } = req.session.record;

    if (isEditUserInfo == 1) {
        let {
            originalname,
            destination,
            filename
        } = req.file


        let exName = path.extname(originalname);
        // 原图路径
        pic = path.join(`${path.dirname(__dirname)}/${destination+pic}`)

        fs.renameSync(
            path.join(`${path.dirname(__dirname)}/${destination+filename}`),
            path.join(`${path.dirname(__dirname)}/${destination+filename+ exName}`)
        );
        avatar = filename + exName;
        sql = `update users set username='${username}',avatar='${avatar}' where id = ${id}`;
        // 删除原图
        fs.unlink(pic, (err) => {})
    } else {
        sql = `update users set username='${username}' where id = ${id}`;
    }

    let {
        affectedRows
    } = await query(sql);

    if (affectedRows > 0) {
        let selSql = `select * from users where id= ${id}`;
        let data = await query(selSql);
        req.session.record = data[0];
        res.cookie('userInfo', JSON.stringify(data[0]), {
            maxAge: 1000 * 60 * 60 * 24 * 7
        })
        res.json(data)
    } else {
        res.send('修改失败');
    }
}

// 密码修改
setController.editPwdForm = async (req, res) => {
    let {
        password1,
        password2,
        password3
    } = req.body;

    let {
        id
    } = req.session.record;

    password1 = md5(`${password1}${pass_secret}`)
    password2 = md5(`${password2}${pass_secret}`)
    password3 = md5(`${password3}${pass_secret}`)


    if (password1 === req.session.record.password && password2 === password3) {
        let sql = `update users set password='${password3}' where id = ${id}`;
        let {
            affectedRows
        } = await query(sql);

        if (affectedRows > 0) {
            req.session.destroy((err) => {
                if (err) {
                    throw err;
                }
            })
            let responseData = {
                password1,
                code: 0,
                message: '密码修改成功'
            }
            res.json(responseData)

        } else {
            res.send('修改失败');
        }
    } else {
        let responseData = {
            password1,
            code: -1,
            message: '密码修改失败'
        }
        res.json(responseData)
    }



}



module.exports = setController;