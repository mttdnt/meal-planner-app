// seeds/posts.js
const { Meal, FoodItem } = require('../models/Meal')
const users = require('./users')

const meals = []

const foodItem = new FoodItem({
  name: "Chicken",
  amount: "100",
  unit: "grams"
});

const meal = new Meal({
  user: users[0], 
  mealList: []
});

meal.mealList.push(foodItem);
meals.push(meal);

module.exports = meals;
