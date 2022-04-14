let express = require('express');
let multer = require('multer');

let router = express.Router();

let upload = multer({
    dest: 'uploads/'
});

// 主页控制器
let indexController = require('../controller/indexController.js');
// 用户控制器
let userController = require('../controller/userController.js');
// 登录控制器
let loginController = require('../controller/loginController.js');
// 注册控制器
let registerController = require('../controller/registerController.js');
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





// 用户 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let {
    getUserData,
} = userController

router.get('/getUserData', getUserData)





// 登录 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let {
    getLogin, // 页面
    loginData, // 验证
    logout, // 退出
} = loginController;

// 页面
router.get('/login', getLogin);

// 验证
router.post('/loginData', loginData);

// 退出
router.post('/logout', logout);





// 注册 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

let {
    register, // 页面
    registerData, // 注册数据
} = registerController;

// 页面
router.get('/register', register);

// 注册数据
router.post('/registerData', registerData);




// 分类 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let {
    classificationList, // 展示页面
    addClassify, // 添加页面
    getClassificationList, // 获取
    // addClassifyData, // 添加
} = classController

// 展示页面
router.get('/classificationList', classificationList);

// 添加页面
router.get('/addClassify', addClassify);

// 获取
router.get('/getClassificationList', getClassificationList);

// // 添加
// router.post('/addClassifyData', addClassifyData);




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

// 添加
router.post('/addArticleData', addArticleData);




// 设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let {
    settings, // 页面
    settingsPut, // logo名修改
    amendForm, // 个人资料修改
    editPwdForm, // 密码修改
} = setController

// 页面
router.get('/settings', settings);

// logo名修改
router.put('/settingsPut', settingsPut);

// 个人资料修改
router.put('/amendForm', upload.single("avatar"), amendForm);

// 密码修改
router.put('/editPwdForm', editPwdForm)



module.exports = router;