const express = require('express');
const app = express();
const PORT = 5000;

app.get('/healthcheck', (req, res) =>{
    res.status(200).json({message: 'success'});
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});