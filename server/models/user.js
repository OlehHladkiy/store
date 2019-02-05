const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');
const SALT_I = 10;
require('dotenv').config();

const userSchema = mongoose.Schema({
    email: {
        required: true,
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        required: true,
        type: String,
        minlength: 5
    },
    name: {
        required: true,
        type: String,
        maxlength: 100
    },
    lastname: {
        required: true,
        type: String,
        maxlength: 100
    },
    phone: {
        type: String,
        maxlength: 100
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    role: {
        type: Number,
        default: 1
    },
    token: {
        type: String
    }
})

userSchema.pre('save', function(next) {
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I, function(err, salt){
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function (cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), process.env.SECRET);

    user.token = token;
    user.save(function (err, user) {
        if(err) return cb(err);
        cb(null, user);
    })
};

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token, process.env.SECRET, function (err, decode) {
        user.findOne({"_id": decode, "token": token}, function (err, user) {
            if(err) return cb(err);
            cb(null, user);
        })
    })
};

const User = mongoose.model('User', userSchema);

module.exports = { User };

