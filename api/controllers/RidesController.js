const _ = require('lodash');
const promise = require('bluebird');
const Route = require('../models/routes');
const functions = require('../utils');

const responseService = functions.response;

class RidesController {
    create(req, res) {
        const route = new Route(req.body);
        route
            .save()
            .then(route => {
                responseService(200, 'success', res, 'Trip Was successfully created', route);
            })
            .catch(err => {
                responseService(500, 'error', res, 'Error occured while creating trip', null, err);
            })
    };

    list(req, res) {
        Route.find({
                route_creator: req.user.id
            })
            .populate('passengers')
            .then(rides => {
                const completedRides = rides.filter(
                    ride => ride.trip_status === 'completed'
                );
                const pendingRides = rides.filter(
                    ride => ride.trip_status !== 'completed'
                )
                const payload = {
                    completedRides,
                    pendingRides
                };
                if (!_.isEmpty(rides)) {
                    return responseService(200, 'success', res, 'Rides were successfully retrieved', payload);
                } else {
                    return responseService(404, 'error', res, 'Rides have not been created by user', null);
                }
            })
            .catch(e => {
                return responseService(500, 'error', res, 'An Error occured', null, e);
            })
    }

    tripSearch(req, res) {
        console.log(req.query)
        Route.find({
                route_start_name: JSON.parse(req.query.from).name,
                route_end_name: JSON.parse(req.query.to).name
            })
            .populate({
                'path': 'trips',
                'match': {
                    trip_status: 'created'
                }
            })
            .populate('route_creator')
            .then(data => {
                if (req.query.loggedUser) {
                    data = data.filter(trip => trip.route_creator._id.toString() !== req.query.loggedUser)
                }
                return responseService(200, 'success', res, 'Successfully retrieved trips', data);
            })
    }
}

module.exports = new RidesController;