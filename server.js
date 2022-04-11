let express = require('express');
let path = require('path');
let express_template = require('express-art-template');
let session = require('express-session');

// 导入路由
let router = require('./router/router.js');
// 导入中间件
let middleware = require('./middleware/middleware.js');


let app = express();

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


//配置模板的路径
app.set('views', __dirname + '/views/');
//设置express_template模板后缀为.html的文件(不设这句话，模板文件的后缀默认是.art)
app.engine('html', express_template);
//设置视图引擎为上面的html
app.set('view engine', 'html');


// dotenv是一个将环境变量从.env文件加载到process.env中的模块
let dotenv = require('dotenv').config({
    path: '.env'
});

let {
    PORT
} = dotenv.parsed; // dotenv.parsed 将.env文件中的环境变量解析成一个对象
// console.log(process.env.PORT); // process.env.PORT 将.env文件中的环境变量加载到process.env中


// 托管静态资源
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));


app.use(session({
    name: 'session_id',
    secret: 'GTA10086%',
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 60000 * 30,
    }
}))


let {
    checkSessionAuth
} = middleware
// 判断session 中间件
app.use(checkSessionAuth);


// 挂载router
app.use(router)





app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
})