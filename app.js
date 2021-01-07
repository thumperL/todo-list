// app.js
// require packages used in the project
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Todo = require('./models/todo');

const routes = require('./routes'); // 引用路由器

const app = express();
const port = process.env.PORT || 3000;

require('./config/mongoose');
// serving static files
app.use(express.static('public'));
// Init template engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
  extended: true,
}));
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'));
// Route to handle routing
app.use(routes);

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
