import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import initAPIRoute from './route/api';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// Config cái express này sẽ hỗ trợ gửi data từ phía cline lên server 1 cách đơn giản và đễ dàng lấy được
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup view engine
configViewEngine(app);

// init web route
initWebRoute(app);

// init API route
initAPIRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})