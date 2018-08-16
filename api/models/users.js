const Mongoose = require('mongoose');
const functions = require('../utils');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = Mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phone:{
        type: String, 
    },
    bio: {
        type: String
    },
    pref: {
        type: Schema.Types.Mixed,
        default: {}
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    car: {
        type: Schema.Types.Mixed, 
    },
    driver_license: {
        type: String
    },
    rating: {
        type: String
    },
    gender:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    image:{
        type: String
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    dob:{
        type: String,
        required: true
    },
    verifications:{
        type: Array,
        default: []
    }

}, {
    timestamps: true, 
    minimize: false
})

userSchema.plugin(uniqueValidator);

module.exports = Mongoose.model('User', userSchema);