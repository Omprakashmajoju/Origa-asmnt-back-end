const mongoose = require('mongoose');
//const users = require('../models/User');
//const order = require('../models/Order');

mongoose.connect('mongodb://localhost:27017/backend', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') } else { console.log('Error in DB connection : ' + err) }
});

require('../models/user');
require('../models/order');