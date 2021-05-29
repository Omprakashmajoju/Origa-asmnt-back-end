const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var user = express('./models/user')

router.get('/data', (req, res) => {
    user.aggregate([
        { $match: {} },
        { $lookup: { from: 'order', localField: 'userId', foreignField: 'userId', as: 'orders' } },
        { $unwind: '$orders' },
        { $group: { _id: null, averageBillValue: { $avg: '$orders.subtotal' } } },
        { $project: { userId: 1, name: 1, noOfOrders: 1, averageBillValue: 1 } }
    ]).then((err, doc) => {
        res.json(doc);
    });
});

router.post('/order', (req, res) => {
    var newOrder = new order({
        userId: req.body.userId,
        subtotal: req.body.subtotal
    })
    newOrder.save().then((err, ins) => {
        if (err) throw err;
        user.updateOne({ userId: ins.userId }, { $inc: { noOfOrders: 1 } }).then((err, doc) => {
            res.json({ data: ins });
        })
    });
});

router.get('/:id', (req, res) => {
    user.findById(req.params.id, (err, doc) => {
        if (err) throw err;
        if (!err) {
            res.json({ data: doc });
        }
    });
});

router.put('/:id', (req, res) => {
    user.updateOne({ userId: req.params.id }, { $inc: { noOfOrders: 1 } }).then((err, doc) => {
        if (err) throw err;
        if (!err) {
            res.json({ data: doc });
        }
    });
});

router.get('/', (req, res) => {
    user.find({}, (err, doc) => {
        if (err) throw err;
        if (!err) {
            res.json({ data: doc });
        }
    });
});

router.delete('/delete/:id', (req, res) => {
    user.findByIdAndRemove(req.params.id, (err, doc) => {
        if (err) throw err;
        if (!err) {
            res.json({ success: true, message: "Deleted Successfully" });
        }
    });
});

module.exports = router;