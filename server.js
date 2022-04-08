let express = require('express');
let path = require('path');
let router = require('./router/router.js');
let express_template = require('express-art-template');
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

// // process.env.PORT 将.env文件中的环境变量加载到process.env中
// console.log(process.env.PORT);


app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(router)


app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
})