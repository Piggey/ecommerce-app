const express = require('express')
const router = express.Router();
const Order = require('../../../models/order');

// zwraca wszystkie zamówienia
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.send(orders);
    } catch (err) {
        res.status(500).send({ 
            message: 'Error fetching orders',
            error: err,
        });
    }
});

// dodaje zamówienie
router.post('/', async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.send(savedOrder);
    } catch (err) {
        res.status(500).send({ 
            message: 'Error inserting order',
            error: err 
        });
    }
});

// zmiana stanu zamówienia o podanym identyfikatorze
router.put('/:id/:status', (req, res) => {
    Order.findById(req.params.id).then((order) => {
        if (order._id == null) {
            res.status(400).send({ message: 'There is no order with id: ' + req.params.id });
            return;
        }
        
        const newStatus = req.params.status;

        switch (order.status) {
            case 'NOTAPPROVED':
                order.status = newStatus;
                break;

            case 'APPROVED':
                if (newStatus in ['NOTAPPROVED']) {
                    res.status(400).send({ message: `Cannot change order status from ${order.status} to ${newStatus}` });
                    return;
                }

                order.status = newStatus;
                break;

            case 'CANCELLED': 
            case 'COMPLETED':
            default:
                res.status(400).send({ message: `Cannot change order status from ${order.status} to ${newStatus}` });
                return;
        }

        order.save();
        res.send(order);
    }).catch((err) => {
        res.status(400).send({ 
            message: 'Error updating order status',
            error: err,
        });
    });
});

// pobranie zamówień z określonym stanem
router.get('/:status', async (req, res) => {
    try {
        const orderByStatus = await Order.find({ status: req.params.status });
        res.send(orderByStatus);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching orders by status: ' + req.params.status });
    }
});

module.exports = router;