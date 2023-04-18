const { Schema, model } = require('mongoose');
const COLLECTION = 'categories';

const categorySchema = Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
    }
});

const Category = model(COLLECTION, categorySchema);

module.exports = Category;