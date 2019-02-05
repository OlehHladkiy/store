const mongoose = require('mongoose');

const packingSchema = mongoose.Schema({
    name: {
        require: true,
        type: String,
        maxlength: 100
    }
})

const Packing = mongoose.model('Packing', packingSchema);

module.exports = { Packing };