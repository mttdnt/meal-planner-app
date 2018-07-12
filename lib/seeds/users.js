const User = require('../models/User');

const users = [];

const matt = new User({
  name: 'Matt Dent',
  email: 'mttdnt@gmail.com'
});

users.push(matt);

module.exports = users;