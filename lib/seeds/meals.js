// seeds/posts.js
const { Meal, FoodItem } = require('../models/Meal');
const users = require('./users');

const meals = [];
const foodItems = [];

const meal = new Meal({
  user: users[0], 
  foodList: []
});

const foodItem = new FoodItem({
  meal: meal,
  name: "Chicken",
  amount: "100",
  unit: "grams"
});

foodItems.push(foodItem);
meal.foodList.push(foodItem._id);
meals.push(meal);

module.exports = {
  meals: meals,
  foodItems: foodItems
};
