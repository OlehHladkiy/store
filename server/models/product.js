const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        maxlength: 100
    },
    description: {
        required: true,
        type: String,
        maxlength: 100000
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    tastes: {
        required: true,
        type: Array,
        default: []
    },
    packingAndPrice: {
        required: true,
        type: Array,
        default: []
    },
    available: {
        required: true,
        type: Boolean
    },
    images: {
        type: Array,
        default: [] 
    }
}, {timestamps: true})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };