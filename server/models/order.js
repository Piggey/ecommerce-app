const { Schema, model } = require('mongoose');
const Product = require('./product');
const COLLECTION = 'orders';

const orderSchema = new Schema({
    orderDate: {
        type: Date,
        required: false,
    },
    status: {
        type: String,
        required: true,
        enum: ['NOTAPPROVED', 'APPROVED', 'CANCELLED', 'COMPLETED'], 
    },
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
            },
            message: 'Invalid email address'
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 13,
    },
    orderedProducts: [
        {
            quantity: {
                type: Number,
                required: true,
                min: 0,
            },
            product: Product.schema,
        }
    ]
});

const Order = model(COLLECTION, orderSchema);

module.exports = Order;