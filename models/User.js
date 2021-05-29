const mongoose = require('mongoose');
var uuid = require('uuid');


var userSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: uuid.v4()
    },
    name: {
        type: String
    },
    noOfOrders: {
        type: Number
    }
});

var user = mongoose.model('users', userSchema);
module.exports = user