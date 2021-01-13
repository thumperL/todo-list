// 引用 Express 與 Express 路由器
const express = require('express');

const router = express.Router();

// Add routes modules
const home = require('./modules/home');
const todos = require('./modules/todos');
const users = require('./modules/users');
const auth = require('./modules/auth');
const { authenticator } = require('../middleware/auth');

// Route requests matching first var to the according modules
router.use('/todos', authenticator, todos);
router.use('/users', users);
router.use('/auth', auth);
router.use('/', authenticator, home); // avoid unlimited redirect loop

// 匯出路由器
module.exports = router;
