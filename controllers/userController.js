const express = require('express');
var router = express.Router();
var user = require('../models/user')
var order = require('../models/order')

router.get('/data', async(req, res) => {
    user.aggregate([
        { $match: {} },
        { $lookup: { from: 'orders', localField: 'userId', foreignField: 'userId', as: 'orders' } },
        { $unwind: '$orders' },
        { $group: { "_id": "$_id", userId: { '$first': '$userId' }, name: { '$first': '$name' }, noOfOrders: { '$first': '$noOfOrders' }, averageBillValue: { $avg: { '$toInt': '$orders.subtotal' } } } },
        { $project: { userId: 1, name: 1, noOfOrders: 1, averageBillValue: 1 } }
    ]).then((doc) => {
        res.send(doc);
    });
});

router.post('/order', async(req, res) => {
    var newOrder = new order({
        userId: req.body.userId,
        subtotal: req.body.subtotal
    })
    newOrder.save().then(async(err, ins) => {
        user.updateOne({ userId: req.body.userId }, { $inc: { "noOfOrders": 1 } }, { "upsert": true }).then((err, doc) => {
            console.log(err, doc)
            res.json({ data: "Order Inserted" });
        })
    });
});

router.get('/:id', async(req, res) => {
    user.findById(req.params.id, (err, doc) => {
        if (err) throw err;
        if (!err) {
            res.json({ data: doc });
        }
    });
});

router.put('/:id', async(req, res) => {
    user.updateOne({ userId: req.params.id }, { $inc: { noOfOrders: 1 } }).then((err, doc) => {
        if (err) throw err;
        if (!err) {
            res.json({ data: doc });
        }
    });
});

router.get('/', async(req, res) => {
    user.find({}, (err, doc) => {
        if (err) throw err;
        if (!err) {
            res.json({ data: doc });
        }
    });
});

router.delete('/delete/:id', async(req, res) => {
    user.findByIdAndRemove(req.params.id, (err, doc) => {
        if (err) throw err;
        if (!err) {
            res.json({ success: true, message: "Deleted Successfully" });
        }
    });
});

module.exports = router;