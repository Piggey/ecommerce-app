const express = require('express');
const router = express.Router();
const Product = require('../../../models/product');

// zwraca wszystkie produkty
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching products' });
    }
});

// zwraca dane produktu o konkretnym identyfikatorze
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });
        res.send(product);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching product with id: ' + req.params.id });
    }
});

// dodaje produkt do bazy
router.post('/', async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.send(savedProduct);
    } catch (err) {
        res.status(500).send({
            message: 'Error inserting product',
            error: err,
        });
    }
});

// aktualizuje produkt o konkretnym identyfikatorze
router.put('/', async (req, res) => {
    const filter = { _id: req.body._id };
    const update = { $set: req.body };

    try {
        const updatedProduct = await Product.updateOne(filter, update, { runValidators: true });
        res.send(updatedProduct); 
    } catch (err) {
        res.status(500).send({ 
            message: 'Error updating product with id: ' + req.body._id,
            error: err,
        });
    }
});

module.exports = router;