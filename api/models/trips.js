const Mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = Mongoose.Schema;

const tripsSchema = new Schema({
  
    route: {
        type: Schema.Types.ObjectId, 
        ref: 'Route',
        required: true
    },
    route_creator:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    passenger: {
        type:Schema.Types.ObjectId,
        ref:'User',
        required: true
    }, 
    seats:{
        type: String,
        required: true
    },
    trip_rating: {
        type: String, 
    },
    trip_status:{
        type: String, 
        enum: ['created','ended'],
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