const express = require('express');
const app = express();
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/mealplanner';
const PORT = 5000;

mongoose
  .connect(uri)
  .then(() => {
    console.log(`Successfully connected to ${uri}`)
    seeds()
  })
  .catch(err => console.log(err.message))

app.get('/healthcheck', (req, res) =>{
    res.status(200).json({message: 'success'});
});

app.post('/login', (req, res) => {
    res.status(201).json({name: 'Default User', email: 'default@example.com' })
  })

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});