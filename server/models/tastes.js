const mongoose = require('mongoose');

const tasteSchema = mongoose.Schema({
    name: {
        require: true,
        type: String,
        maxlength: 100
    }
})

const Taste = mongoose.model('Taste', tasteSchema);

module.exports = { Taste };