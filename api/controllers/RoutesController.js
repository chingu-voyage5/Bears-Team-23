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
    }
}

module.exports = new RoutesController;