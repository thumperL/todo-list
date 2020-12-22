// app.js
// require packages used in the project
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Todo = require('./models/todo');

const app = express();
const port = 3000;

// DB Connection
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', () => {
  console.log('DB Connection FAIL');
});
db.once('open', () => {
  console.log('DB Connection SUCCESS');
});

// serving static files
app.use(express.static('public'));

// Init template engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

// serving static files
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true,
}));

// routes setting
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then((todos) => res.render('index', { todos }))
    .catch((error) => console.error(error));
});

// CREATE Operation
app.get('/todos/new', (req, res) => res.render('new'));
app.post('/todos', (req, res) => {
  // The the posted name
  const { name } = req.body;

  // Created the instance
  const todo = new Todo({
    name,
  });

  return todo.save()
    .then(() => res.redirect('/')
      .catch((error) => console.error(error)));
});

// READ operation
app.get('/todos/:id', (req, res) => {
  const { id } = req.params;
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch((error) => console.log(error));
});

// UPDATE operation
app.get('/todos/:id/edit', (req, res) => {
  const { id } = req.params;
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch((error) => console.log(error));
});
app.post('/todos/:id/edit', (req, res) => {
  const { id } = req.params;
  const { name, isDone } = req.body;
  return Todo.findById(id)
    .then((todo) => {
      todo.name = name;
      todo.isDone = isDone === 'on';
      /*
        // The line above takes isDone === 'on' first, then assigned to todo.isDone.
        // Translates to below
        if (isDone === 'on') {
          todo.isDone = true
        } else {
          todo.isDone = false
        }
      */

      return todo.save();
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch((error) => console.log(error));
});

// DELETE operation
app.post('/todos/:id/delete', (req, res) => {
  const { id } = req.params;
  return Todo.findById(id)
    .then((todo) => todo.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});

app.post('/', (req, res) => {
  console.log('get form POST request');
  console.log('req.body', req.body);
  res.render('index');
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
