let express = require('express');
let router = express.Router();


// 主页控制器
let indexController = require('../controller/indexController.js');
// 登录控制器
let loginController = require('../controller/loginController.js');
// 设置控制器
let setController = require('../controller/setController.js');
// 分类控制器
let classController = require('../controller/classController.js');
// 文章控制器
let articleController = require('../controller/articleController.js');



// 后台主页 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let {
    getIndex, // 主页
    getIndexData, // 获取
} = indexController;

// 主页
router.get('/', getIndex);

// 获取
router.get('/getIndexData', getIndexData);




// 登录 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let {
    getLogin, // 后台登录页面
} = loginController;

// 后台登录页面
router.get('/login', getLogin);




// 分类 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let {
    classificationList, // 页面
    getClassificationList, // 获取
} = classController

// 页面
router.get('/classificationList', classificationList);

// 获取
router.get('/getClassificationList', getClassificationList);




// 文章 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let {
    articleList, // 展示页面
    addArticle, // 添加页面
    getArticleList, // 获取
    deleteArticle, // 删除
    updateArticle, // 修改
    addArticleData, // 添加
} = articleController;

// 展示页面
router.get('/articleList', articleList);

// 添加页面
router.get('/addArticle', addArticle);

// 获取
router.get('/getArticleList', getArticleList);

// 删除
router.delete('/deleteArticle', deleteArticle);

// 修改
router.put('/updateArticle', updateArticle);

// 修改
router.post('/addArticleData', addArticleData);




// 设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let {
    settings, // 页面
    settingsPut, // 修改
} = setController

// 页面
router.get('/settings', settings);

// 修改
router.put('/settingsPut', settingsPut);



module.exports = router;