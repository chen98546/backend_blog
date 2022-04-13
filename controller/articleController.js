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
    let {
        page,
        limit
    } = req.query;
    let sql = `select count(id) as count from article`;
    let result = await query(sql);
    let {
        count
    } = result[0]


    let offset = (page - 1) * limit;
    let pagingSql = `SELECT t1.*,t2.cate_name,t3.username FROM article t1 LEFT JOIN category t2 ON t1.classify_id = t2.classify_id LEFT JOIN users t3 ON t1.author = t3.author ORDER BY t1.id DESC LIMIT ${offset},${limit} `
    let data = await query(pagingSql)
    data = data.map(item => {
        let {
            status,
            add_date,
            username
        } = item;
        // 状态
        item.status = status == 1 ? '审核通过' : '未审核';
        // 时间格式化
        item.add_date = moment(add_date).format('YYYY-MM-DD HH:mm:ss');
        item.username = username || '匿名用户'
        return item;
    })


    // 2.返回json数据（规范）给前端
    const responseData = {
        data,
        count,
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
        classify_id
    } = req.body;
    let sql = `update article set title='${title}',content='${content}',author=${author},status=${status},add_date='${add_date}',classify_id=${classify_id}  where id=${id}`;
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
        classify_id
    } = req.body;
    let sql = `insert into article(title,content,author,status,add_date,classify_id) values('${title}','${content}',${author},${status},'${add_date}',${classify_id})`;
    let data = await query(sql);
    res.send('修改成功');

}


module.exports = articleController;