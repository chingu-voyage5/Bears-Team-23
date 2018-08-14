const _ = require('lodash');
const promise = require('bluebird');
const Trips = require('../models/trips');
const Routes = require('../models/routes');
const functions = require('../utils');
const responseService = functions.response;

class TripsController {
   create(req, res) {
        const trip = {
            route: req.body._id,
            route_creator: req.body.route_creator._id,
            passenger: req.user.id,
            seats: req.body.noOfSeats
        }
        Routes.findById(trip.route).then(route => {
            
            if(!route.isDeleted && route.seats_available >= trip.seats){
                const newTrip = Trips.create(trip);
                  newTrip.then(() => {
                    route.seats_available -= trip.seats;
                    route.save().then(() => {;
                        return responseService(200,'success', res, 'Trip has been booked successfully');
                    })
                })
            }
            else return responseService(500,'error',res, 'Seats No Longer Available');
        })
        .catch(e => { return responseService(500,'error',res, 'Invalid route for trip', e) })
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