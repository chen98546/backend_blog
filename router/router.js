let express = require('express');
let controller = require('../controller/controller.js');
let router = express.Router();

let {
    getIndex,
    getLogin,
    classificationList,
    articleList,

    getIndexData,
    getClassificationList,
    getArticleList,
    deleteArticle,
    updateArticle
} = controller;

// 后台首页
router.get('/', getIndex)
// 后台登录页面
router.get('/login', getLogin)
// 分类列表
router.get('/classificationList', classificationList)
// 文章列表
router.get('/articleList', articleList)


// 后台主页获取数据
router.get('/getIndexData', getIndexData)

// 分类列表获取数据
router.get('/getClassificationList', getClassificationList)

// 文章列表获取数据
router.get('/getArticleList', getArticleList)


// 删除
router.delete('/deleteArticle', deleteArticle)

// 修改
router.put('/updateArticle', updateArticle)



module.exports = router;