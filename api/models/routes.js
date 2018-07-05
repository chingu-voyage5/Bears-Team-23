const Mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = Mongoose.Schema;

const routeSchema = new Schema({

    route_start: {
        type: Array, 
        required: true 
    }, 
    route_start_name:{
        type:String,
        required:true
    },
    route_end:{
        type: Array, 
        required: true
    },
    route_end_name:{
        type:String,
        required:true
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
    },
    trips:[{
        type: Schema.Types.ObjectId  ,
        ref:'Trip'      
    }]

}, {
    timestamps: true
})



module.exports = Mongoose.model('Route', routeSchema);