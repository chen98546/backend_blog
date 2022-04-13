// 数据库配置

// dotenv是一个将环境变量从.env文件加载到process.env中的模块
let dotenv = require('dotenv').config({
    path: '.env'
});


let {
    SQLHOST,
    SQLPORT,
    SQLUSER,
    SQLPASSWORD,
    SQLDATABASE
} = dotenv.parsed;

module.exports = {
    host: SQLHOST,
    port: SQLPORT,
    user: SQLUSER,
    password: SQLPASSWORD,
    database: SQLDATABASE
}