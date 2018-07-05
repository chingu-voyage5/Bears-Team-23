const Mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = Mongoose.Schema;

const tripsSchema = new Schema({
  
    route: {
        type: Schema.Types.ObjectId, 
        ref: 'Route'
    },
    trip_creator:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    trip_passengers: {
        type: Array, 
        default: []
    }, 
    trip_start_time: {
        type: Date, 
        required: true
    },
    trip_return_time: {
        type: Date
    },
    trip_days:{
        type: Array,
        default: []
    },
    trip_rating: {
        type: String, 
    },
    trip_status:{
        type: String, 
        enum: ['created','started','ended'],
        default:'created'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})



module.exports = Mongoose.model('Trip', tripsSchema);