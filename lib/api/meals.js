const express = require('express');
const Router = express.Router;
const router = Router();
const { Meal, FoodItem } = require('../models/Meal');
const User  = require('../models/User');
const auth = require("../middleware/auth");

const findUserById = async (req, res, next) => {
  const { id } = req.token.user;
  try {
    const doc = await User.findById(id);
    if (!doc) {
      next(new Error('not found'));
    }
    req.user = doc;
    next();
  } catch (e) {
    next(new Error(e));
  }
};

// Get all meals

router.get('/', async (req, res, next) => {
  try {
    const docs = await Meal.find().populate("foodList").populate('user');
    res.status(200).send(docs);
  } catch (e) {
    next(e);
  }
});

//Get meals for specific User

router.get('/user', auth, findUserById, async (req, res, next) => {
  try {
    const doc = await Meal.find({user: req.user._id}).populate("foodList");
    res.status(200).send(doc);
  } catch (e) {
    next(e);
  }
});

//Create meal

router.post('/user', auth, findUserById, async (req, res, next) => {
  try {
    const new_meal = new Meal(
      {
        user: req.user._id,
        foodList: []
      }
    );

    const meal_doc = await User.findOne({_id: req.user._id});

    let new_meals = meal_doc.meals;
    new_meals.push(new_meal);

    await User.update({_id: req.user._id}, {meals: new_meals});

    const doc = await new_meal.save();
    res.status(200).send(doc);
  } catch (e) {
    next(e);
  }
});

// Delete Meal

router.delete('/:meal_id', auth, findUserById, async (req, res, next) => {
  try {

    const { meal_id } = req.params;
    const doc = await Meal.findByIdAndRemove({_id: meal_id});
    const meal_doc = await User.findOne({_id: req.user._id});
    const new_meals = meal_doc.meals;
    new_meals.filter( meal => {
      return meal._id !== meal_id;
    });
    await User.update({_id: req.user._id}, {meals: new_meals});
    res.status(200).send(doc);

  } catch (e) {
    next(e);
  }
});

//Create Food Item

router.post('/food/addFood', auth, findUserById, async (req, res, next) => {
  try{
    const { meal, name, amount, unit} = req.body;

    const mealDoc = await Meal.findById({ _id: meal});
    
    if(mealDoc){

      const food = new FoodItem({
        meal: meal,
        name: name,
        amount: amount,
        unit: unit
      });

      const foodDoc = await food.save();

      const newFoodList = mealDoc.foodList;

      newFoodList.push(food._id);

      const newMealDoc = await Meal.update({_id: meal}, {foodList: newFoodList});

      res.status(200).send(foodDoc);

    }else{
      next(new Error("Can't add to an nonexistent meal"));
    }
  }catch(e){
    next(e);
  }
});

//Delete Food Item

router.delete('/food/deleteFood/:meal_id/:food_id', auth, findUserById, async (req, res, next) => {
  try{
    const { meal_id, food_id } = req.params;

    const mealDoc = await Meal.findById({ _id: meal_id});
    
    if(mealDoc){

      const foodListDoc = await FoodItem.findByIdAndRemove({_id: food_id});

      const newFoodList = mealDoc.foodList;
      newFoodList.filter( food => {
        return food._id !== food_id;
      });

      const newMealDoc = await Meal.update({_id: meal_id}, {foodList: newFoodList});

      res.status(200).send({message: "Success"});

    }else{
      next(new Error("Can't delete from an nonexistent meal"));
    }
  }catch(e){
    next(e);
  }

});




module.exports = router;