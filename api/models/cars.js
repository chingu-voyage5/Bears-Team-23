const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const carSchema = new Schema({
    year: {
        type: String
    }, 
    make: {
        type: String
    }, 
    model:{
        type: String
    }
})

module.exports = Mongoose.model('Car', carSchema);