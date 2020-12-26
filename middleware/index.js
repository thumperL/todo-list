const User = require('../models/user');
const db = require('../config/mongoose');
const user = require('../models/user');

const login = async (req, res, next) => {
  const request_data = {
    ...req.params,
    ...req.query,
    ...req.body,
  };

  try {
    User.find({ email: request_data.email })
      .lean()
      .then((user) => {
        if (user.length === 0) {
          return res.send('User does not exist. <a href="/login">Login again</a>');
        }

        if (user[0].password !== request_data.password) {
          return res.send('Password Incorrect. <a href="/login">Login again</a>');
        }
        // Set userId Session, then return to homepage
        req.session.userId = user[0]._id;
        return res.redirect('/');
      })
      .catch((error) => console.log(error));
    // return res.render('/');
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
module.exports = { login };

module.exports.checkLoginStatus = async (req, res, next) => { // middleware 1
  try {
    User.findById(req.session.userId)
      .lean()
      .then((user) => {
        if (user === null) {
          return res.redirect('/login');
        }
        next();
      })
      .catch((error) => console.log(error));
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
