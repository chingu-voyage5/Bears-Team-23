const _ = require('lodash');
const Promise = require('bluebird');
const Route = require('../models/routes');
const functions = require('../utils');
const responseService = functions.response;

class RoutesController {
    create(req, res){
        const route = new Route(req.body);
        route
        .save()
        .then(route =>{
            responseService(200,'success',res,'Route Was successfully created', route);
        })
        .catch(err=>{
            responseService(500,'error', res,'Error occured while creating route',null,err);
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
}

module.exports = new RoutesController;