const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodItemSchema = new Schema({
    name: {
        type: String,
        default: true
    },
    amount: {
        type: String,
        default: true
    },
    unit: {
        type: String,
        default: true
    }
});

const mealSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    mealList: [foodItemSchema]
});

const Meal = mongoose.model('Meal', mealSchema);
const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = {
    Meal: Meal,
    FoodItem: FoodItem
};