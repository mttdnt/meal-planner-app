const express = require('express');
const app = express();
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/mealplanner';
const PORT = 5000;


app.use('/users', require('./api/users'));
app.use('/meals', require('./api/meals'));

app.use((err, req, res, next) => {
  res.status(500).json({ err: err.toString() });
})

app.listen(PORT, async () => {
  await mongoose.connect(uri);
  console.log(`Listening on ${PORT}`);
})

app.get('/healthcheck', (req, res) =>{
    res.status(200).json({message: 'success'});
});

app.post('/login', (req, res) => {
    res.status(201).json({name: 'Default User', email: 'default@example.com' })
  })
