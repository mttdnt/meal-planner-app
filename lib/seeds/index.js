// seeds/index.js
const User = require('../models/User');
const { Meal } = require('../models/Meal');
const { FoodItem } = require('../models/Meal');
const users = require('./users');
const { meals, foodItems} = require('./meals');
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/mealplanner';

// truncate is just a fancy word for 'delete all of'
const truncateDatabase = async () => {
  // here we delete all our users and posts so we can start with fresh data
  return Promise.all([User.deleteMany(), Meal.deleteMany(), FoodItem.deleteMany()]);
}

const makeSeeds = async () => {
  await mongoose.connect(uri);
  await truncateDatabase();
  await Promise.all(users.map(user => user.save()));;
  await Promise.all(meals.map(meal => meal.save()));
  await Promise.all(foodItems.map( foodItem => foodItem.save()));

  mongoose.connection.close();
}

makeSeeds();
