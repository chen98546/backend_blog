// 分类控制器

let query = require('../mysql/connection.js');

let classController = {
    // 分类页面
    classificationList(req, res) {
        res.render('classificationList') // 用户名 , {'uname': req.session.record.username}
    },
    // 添加页面
    addClassify(req, res) {
        res.render('addClassify') // 用户名 , {'uname': req.session.record.username}
    },
}


// 获取
classController.getClassificationList = async (req, res) => {
    let {
        page,
        limit
    } = req.query;

    let countSql = `select count(cate_id) as count from category`;
    let result = await query(countSql);
    let {
        count
    } = result[0];
    let offset = (page - 1) * limit;


    let data;
    if (!page && !limit && !offset) {
        let indexSql = `select count(t1.classify_id) as sum,t2.cate_name,t2.cate_id from article as t1 inner join category as t2 on t1.classify_id  = t2.classify_id GROUP BY t1.classify_id`;
        data = await query(indexSql);
    } else {
        let classifySql = `SELECT t1.*,count(t1.classify_id) as sum,t2.classify_id FROM category t1 LEFT JOIN article t2 ON t1.classify_id = t2.classify_id GROUP BY t1.classify_id order by cate_id desc LIMIT ${offset},${limit}`
        data = await query(classifySql);
    }

    const responseData = {
        count,
        data,
        code: 0,
        msg: "success"
    }
    res.json(responseData)
}

// // 添加
// classController.addClassifyData = async (req, res) => {
//     let {
//         cate_name,
//         classify_id,
//     } = req.body;
//     let sql = `insert into category (cate_name,classify_id) values('${cate_name}',${classify_id})`;
//     let data = await query(sql);
//     res.json(data)
// }



module.exports = classController;