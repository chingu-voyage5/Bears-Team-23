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
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    car_brand: {
        type: String,
    },
    car_model: {
        type: String,
    },
    car_available_seats: {
        type: String
    },
    car_license_plate: {
        type: String
    },
    driver_license: {
        type: String
    },
    car_reg_number: {
        type: String
    },
    rating: {
        type: String
    },
    gender:{
        type: String
    },
    password: {
        type: String,
        required: true,
        minlength: 6
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
    timestamps: true
})

userSchema.plugin(uniqueValidator);

module.exports = Mongoose.model('User', userSchema);