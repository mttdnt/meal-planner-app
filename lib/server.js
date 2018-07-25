const express = require('express');
const app = express();
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/mealplanner';
const PORT = 5000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use('/users', require('./api/users'));
app.use('/meals', require('./api/meals'));

app.use((err, req, res, next) => {
  res.status(500).json({ err: err.toString() });
})

app.listen(PORT, async () => {
  await mongoose.connect(uri);
  console.log(`Listening on ${PORT}`);
})