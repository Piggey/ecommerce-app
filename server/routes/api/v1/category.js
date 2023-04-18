const express = require('express');
const router = express.Router();
const Category = require('../../../models/category');

// zwraca wszystkie kategorie
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching categories' });
    }
});

module.exports = router;