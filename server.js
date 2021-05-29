require('./config/db');
const express = require('express');
const bodyparser = require('body-parser');

const userController = require('./controllers/userController');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.use('/user', userController);

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});