const Mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = Mongoose.Schema;

const userSchema = Schema({
    attributes: {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        role: {
            type: String,
            required: true,
            enum: ['driver', 'passenger']
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
        }

    },
    password: {
        type: String,
        required: true, 
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }],
    isDeleted: {
        type: Boolean,
        default: false
    }


}, {
    timestamps: true
})


userSchema.plugin(uniqueValidator);

module.exports = Mongoose.model('User', userSchema);