const express = require('express');
const Router = express.Router;
const router = Router();
const { Meal } = require('../models/Meal');

router.get('/', async (req, res, next) => {
  try {
    const docs = await Meal.find();
    res.status(200).send(docs);
  } catch (e) {
    next(e);
  }
})

router.get('/:meal_id', async (req, res, next) => {
    try {
      const { meal_id } = req.params;
      const doc = await Meal.findById(meal_id);
      res.status(200).send(doc);
    } catch (e) {
      next(e);
    }
  })

  router.get('/user/:user_id', async (req, res, next) => {
    try {
      const { user_id } = req.params;
      console.log()
      const doc = await Meal.find({user: user_id});
      res.status(200).send(doc);
    } catch (e) {
      next(e);
    }
  })

module.exports = router;