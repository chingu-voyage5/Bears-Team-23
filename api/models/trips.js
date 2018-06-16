const Mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = Mongoose.Schema;

const tripsSchema = Schema({
  
    trip_route_id: {
        type: Schema.Types.ObjectId, 
        refs: 'Trip'
    },
    trip_creator:{
        type: Schema.Types.ObjectId,
        refs: 'User'
    },
    trip_passengers: {
        type: Array, 
        default: []
    }, 
    trip_start_time: {
        type: Date, 
        required: true
    },
    trip_days:{
        type: Array,
        default: []
    },
    trip_rating: {
        type: String, 
        required: true
    },
    trip_status:{
        type: String, 
        enum: ['created', 'ended']
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})



module.exports = Mongoose.model('Trip', tripsSchema);