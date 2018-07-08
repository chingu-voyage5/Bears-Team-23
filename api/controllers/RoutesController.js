const _ = require('lodash');
const Promise = require('bluebird');
const Route = require('../models/routes');
const functions = require('../utils');
const responseService = functions.response;

class RoutesController {
    create(req, res){
        console.log(req.body)
        const route = new Route(req.body);
        route
        .save()
        .then(route =>{
            responseService(200,'success',res,'Trip Was successfully created', route);
        })
        .catch(err=>{
            responseService(500,'error', res,'Error occured while creating trip',null,err);
        })
    };

    list(req, res){
        Route.find({route_creator:req.user.id})
        .exec()
        .then(routes=>{
            if(!_.isEmpty(routes)){
                return responseService(200,'success',res,'Routes were successfully retrieved', routes);
            }
            else {
                return responseService(404,'error',res,'Routes have not been created by user', null);
            }
        })
        .catch(e=>{
            return responseService(500,'error', res, 'An Error occured', null, e);
        })
    }

    tripSearch(req, res){
        console.log(req.query)
        Route.find({
            route_start_name:  "Ikoyi, Lagos, Nigeria",
            // JSON.parse(req.query.from).name,
            route_end_name: "Sangotedo, Nigeria"
            // JSON.parse(req.query.to).name
        }).populate({'path':'trips', 'match': {trip_status: 'created'}}).populate('route_creator').exec().then(data=>{
            return responseService(200,'success', res, 'Successfully retrieved trips', data);
        })
    }
}

module.exports = new RoutesController;