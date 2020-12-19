const mongoose = require('mongoose');
const Todo = require('../todo');

// DB Connection
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', () => {
  console.log('DB Connection FAIL');
});
db.once('open', () => {
  console.log('DB Connection SUCCESS');

  for (let i = 0; i < 10; i++) {
    Todo.create({
      name: `name-${i}`,
    });
  }

  console.log('Seeder Done');
});
