const Mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = Mongoose.Schema;

const routeSchema = new Schema({
    //[Name of route, latitude, longitude]
    route_start: {
        type: Array, 
        required: true 
    },
    route_start_name: {
        type: String, 
        required: true
    },
    route_end_name: {
        type: String, 
        required: true
    },
    route_end:{
        type: Array, 
        required: true
    },
    est_trip_length: {
        type: String, 
        required: true
    }, 
    est_trip_duration:{
        type: String, 
        required: true
    },
    route_creator: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    has_return_route: {
        type: Boolean, 
        default: false
    },
    init_route: {
        type: Schema.Types.ObjectId  ,
        ref:'Route' 
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    passenger_space:{
        type: String,
        required: true
    },
    trip_rating:{
        type: String,
        enum: [1,2,3,4,5]
    },
    trip_start:{
        type: Date,
        required: true
    },
    trip_status:{
        type: String, 
        enum: ['created','started','ended'],
        default:'created'
    },
    passengers:[{
        type: Schema.Types.ObjectId  ,
        ref:'User'      
    }],
    extra:{
        type: String,
    }

}, {
    timestamps: true
})



module.exports = Mongoose.model('Route', routeSchema);