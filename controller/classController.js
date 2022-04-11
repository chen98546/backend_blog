// 分类控制器

let query = require('../mysql/connection.js');

let classController = {
    // 分类页面
    classificationList(req, res) {
        res.render('classificationList')
    },
}


// 获取
classController.getClassificationList = async (req, res) => {
    // let sql = `select count(t1.cate_id) as sum,t2.cate_name,t2.cate_id from article as t1 inner join category as t2 on t1.cate_id  = t2.cate_id GROUP BY t1.cate_id`;
    let sql = `select count(t1.classify_id) as sum,t2.cate_name,t2.cate_id from article as t1 inner join category as t2 on t1.classify_id  = t2.classify_id GROUP BY t1.classify_id`;
    let data = await query(sql);
    const responseData = {
        data,
        code: 0,
        msg: "success"
    }
    res.json(responseData)
}



module.exports = classController;