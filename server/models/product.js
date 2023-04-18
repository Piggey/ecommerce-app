const { Schema, model } = require('mongoose');
const Category = require('./category');
const COLLECTION = 'products';

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 500,
    },
    price: {
        type: Number,
        required: true,
        min: 0.01,
    },
    weight: {
        type: Number,
        required: true,
        min: 0.01,
    },
    category: Category.schema
});

const Product = model(COLLECTION, productSchema);

module.exports = Product;