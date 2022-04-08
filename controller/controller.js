let moment = require('moment');
let query = require('../mysql/connection.js');


let controller = {
    // 渲染后台主页
    getIndex(req, res) {
        res.render('index')
    },
    // 渲染后台登录页面
    getLogin(req, res) {
        res.render('login')
    },
    // 渲染分类列表页面
    classificationList(req, res) {
        res.render('classificationList')
    },
    // 渲染文章列表页面
    articleList(req, res) {
        res.render('articleList')
    },
}

// 后台主页获取数据
controller.getIndexData = async (req, res) => {
    let sql = `select * from article`;
    let data = await query(sql);
    res.json(data);
}

// 分类列表获取数据
controller.getClassificationList = async (req, res) => {
    // let sql = `select * from category`;
    let sql = `select count(t1.cate_id) as sum,t2.cate_name,t2.cate_id from article as t1 inner join category as t2 on t1.cate_id  = t2.cate_id GROUP BY t1.cate_id`;
    let data = await query(sql);
    // 2.返回json数据（规范）给前端
    const responseData = {
        data,
        code: 0,
        msg: "success"
    }
    res.json(responseData)
}

// 文章列表获取数据
controller.getArticleList = async (req, res) => {
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
controller.deleteArticle = async (req, res) => {
    let {
        id
    } = req.query;
    let sql = `delete from article where id = ${id}`;
    let data = await query(sql);
    res.send('删除成功');

}

// 修改
controller.updateArticle = async (req, res) => {
    let {
        id,
        title,
        content,
        author,
        status,
        add_date,
        cate_id
    } = req.body;
    let sql = `update article set title=?,content=?,author=?,status=?,add_date=?,cate_id=?  where id=?`;
    let bindData = [title, content, author, status, add_date, cate_id, id];
    let data = await query(sql, bindData);
    res.send('修改成功');

}

module.exports = controller;


// # select category.* from article inner join category on article.cate_id = category.cate_id
// # select t1.cate_id,t2.cate_name from article as t1 inner join category as t2 on t1.cate_id  = t2.cate_id
// # select count(case when cate_id=2 then 1 end) as num from article;
// # select count(case when t1.cate_id=2 then 1 end) as num,t2.cate_name from article as t1 inner join category as t2 on t1.cate_id  = t2.cate_id