const _ = require('lodash');
const Promise = require('bluebird');
const Trips = require('../models/trips');
const Routes = require('../models/routes');
const functions = require('../utils');
const responseService = functions.response;

class TripsController {
   create(req, res) {
        const trip = new Trips(req.body);
        trip
            .save()
            .then(trip => {
                Routes.findByIdAndUpdate(req.body.route, {
                    $push:{
                        'trips': trip._id
                    }
                }).exec().then(()=>{
                    responseService(200, 'success', res, 'Trip Was successfully created', trip);
                })
                
            })
            .catch(err => {
                responseService(500, 'error', res, 'Error occured while creating trip', null, err);
            })
    };

    list(req, res) {
        Trips.find({
                trip_creator: req.user.id
            })
            .exec()
            .then(trips => {
                if (!_.isEmpty(trips)) {
                    return responseService(200, 'success', res, 'Trips were successfully retrieved', trips);
                } else {
                    return responseService(404, 'error', res, 'Trips have not been created by user', null);
                }
            })
            .catch(e => {
                return responseService(500, 'error', res, 'An Error occured', null, e);
            })
    }
}

module.exports = new TripsController;