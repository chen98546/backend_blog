let express = require('express');
let path = require('path');
let router = require('./router/router.js');

// dotenv是一个将环境变量从.env文件加载到process.env中的模块
let dotenv = require('dotenv').config({
    path: '.env'
});

// // dotenv.parsed 将.env文件中的环境变量解析成一个对象
// console.log(dotenv.parsed);

let {
    PORT
} = dotenv.parsed;

// // process.env.PORT 将.env文件中的环境变量加载到process.env中
// console.log(process.env.PORT);

let app = express();

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(router)


app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
})