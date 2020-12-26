const User = require('../user');
const db = require('../../config/mongoose');

const users = [
  {
    firstName: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman',
  },
  {
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday',
  },
  {
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram',
  },
  {
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!',
  },
  {
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password',
  },
];

db.once('open', () => {
  console.log('DB Connection SUCCESS');
  User.insertMany(users)
    .then((usersCreated) => {
      console.log('User Created', usersCreated);
      console.log('User Seeder Completed.');
    })
    .catch((err) => {
      console.log('ERROR IMPORTING', err);
      console.log('User Seeder Failed.');
    });
});
