// 文章控制器

let moment = require('moment');
let query = require('../mysql/connection.js');

let articleController = {
    // 文章页面
    articleList(req, res) {
        res.render('articleList')
    },
    // 添加页面
    addArticle(req, res) {
        res.render('addArticle')
    },
}


// 获取
articleController.getArticleList = async (req, res) => {
    let sql = `select * from article`;
    let data = await query(sql);

    // 时间格式化
    data.forEach(item => {
        item.add_date = moment(item.add_date).format('YYYY-MM-DD HH:mm:ss');
    })

    // 2.返回json数据（规范）给前端
    const responseData = {
        data,
        code: 0,
        msg: "success"
    }
    res.json(responseData)
}


// 删除
articleController.deleteArticle = async (req, res) => {
    let {
        id
    } = req.query;
    let sql = `delete from article where id = ${id}`;
    let data = await query(sql);
    res.send('删除成功');

}


// 修改
articleController.updateArticle = async (req, res) => {
    let {
        id,
        title,
        content,
        author,
        status,
        add_date,
        cate_id
    } = req.body;
    let sql = `update article set title='${title}',content='${content}',author=${author},status=${status},add_date='${add_date}',cate_id=${cate_id}  where id=${id}`;
    let data = await query(sql);
    res.send('修改成功');

}


// 添加
articleController.addArticleData = async (req, res) => {
    let {
        id,
        title,
        content,
        author,
        status,
        add_date,
        cate_id
    } = req.body;
    let sql = `insert into article(title,content,author,status,add_date,cate_id) values('${title}','${content}',${author},${status},'${add_date}',${cate_id})`;
    let data = await query(sql);
    res.send('修改成功');

}


module.exports = articleController;