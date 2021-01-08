// app.js
// require packages used in the project
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Todo = require('./models/todo');

const routes = require('./routes'); // 引用路由器

const app = express();
const port = process.env.PORT || 3000;

// Serve DB and static files
require('./config/mongoose');

app.use(express.static('public'));

// Init template engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

// Setup sessions, POSTs body parser, use methodOverride to RESTify requests, then add ROUTER
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false, // force session back to session store
  saveUninitialized: true, // force untouched back to session store
}));
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(methodOverride('_method'));
app.use(routes);

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
