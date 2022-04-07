let express = require('express');
let path = require('path');
let router = require('./router/router.js');
let app = express();

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(router)


app.listen(12580, () => {
    console.log('server is running at port 12580');
})