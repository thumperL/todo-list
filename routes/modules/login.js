// 引用 Express 與 Express 路由器
const express = require('express');
const authenticator = require('../../middleware');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login', { user: req.user });
});

router.post('/', authenticator.login, (req, res) => {
  res.redirect('/');
});

// 匯出路由模組
module.exports = router;
