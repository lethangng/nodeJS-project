import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import initAPIRoute from './route/api';

require('dotenv').config();

// import morgan: hỗ trợ log các req gửi lên server
var morgan = require('morgan');

const app = express();
const port = process.env.PORT || 8080;

// Using morgan
// app.use(morgan('combined'));

// Config cái express này sẽ hỗ trợ gửi data từ phía client lên server 1 cách đơn giản và đễ dàng lấy được
// Cụ thể thì nó sẽ chuyển dữ liệu req sang kiểu JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup view engine
configViewEngine(app);

// init web route
initWebRoute(app);

// init API route
initAPIRoute(app);

// handle 404 not found
// đây là một cái middleware
app.use((req, res, next) => {
    return res.render('404.ejs')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})