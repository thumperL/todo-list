const express = require('express');

const router = express.Router();
const Todo = require('../../models/todo');

router.get('/new', (req, res) => res.render('new'));
router.post('/', (req, res) => {
  const { name } = req.body;
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch((error) => console.log(error));
});
router.get('/:id/edit', (req, res) => {
  const { id } = req.params;
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch((error) => console.log(error));
});
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  return Todo.findById(id)
    .then((todo) => todo.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});
module.exports = router;
