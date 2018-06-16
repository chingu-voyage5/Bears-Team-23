const Mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = Mongoose.Schema;

const routeSchema = Schema({
  
    route_id: {
        type: String, 
        required: true
    },
    route_start: {
        type: String, 
        required: true 
    }, 
    route_end:{
        type: String, 
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
        ref: 'User' 
    },
    is_return_route: {
        type: Boolean, 
        default: false
    },
    init_route_id: {
        type: String, 
    },
    isDeleted: {
        type: Boolean,
        default: false
    }


}, {
    timestamps: true
})



module.exports = Mongoose.model('Route', routeSchema);