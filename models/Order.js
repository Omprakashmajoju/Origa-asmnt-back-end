const mongoose = require('mongoose');
var moment = require('moment');
var uuid = require('uuid');


var orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        default: uuid.v4()
    },
    userId: {
        type: String
    },
    subtotal: {
        type: String
    },
    date: {
        type: String,
        default: moment().format('Do MMMM YYYY')
    }
});

var order = mongoose.model('order', orderSchema);
module.exports = order