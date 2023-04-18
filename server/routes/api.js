const express = require('express');
const api = express();

const products = require('./api/v1/product');
const categories = require('./api/v1/category');
const orders = require('./api/v1/order');

api.use('/products', products);
api.use('/categories', categories);
api.use('/orders', orders);

module.exports = api;
