const _ = require('lodash');
const Promise = require('bluebird');
const Users = require('../models/users');
const Cars = require('../models/cars');
const Trips = require('../models/trips');
const functions = require('../utils');
const responseService = functions.response;

class UserController {
    list(req, res){ 
        Users.find().populateAll().then(user=>{
            return responseService(200, 'success', res, 'Users retrieved successfully', user);
        })
        .catch(e=>{
            return responseService(500, 'error', res, 'Error retrieving users', e);
        })
    };

    view(req, res){
        Users.findById(req.params.id).populateAll().then(user => {
            return responseService(200, 'success', res, 'Users retrieved successfully', user);
        })
        .catch(e=>{
            return responseService(500, 'error', res, 'Error retrieving users', e);
        })
    }
    
    update(req, res){
        Users.findByIdAndUpdate(req.user.id, req.body, { new: true })
        .then(user => {
                return responseService(200, 'success', res, 'Successfully updated user',user)
        })
        .catch(e => {
            return responseService(500, 'error', res, 'There was an error while updating user', e);
        })
    }

    delete(req, res) {
        //Use UserID decoded from the JWT token in the header
        Users.findByIdAndRemove(req.user.id)
            .exec()
            .then(user => {
                return responseService(200, 'success', res, 'Acccount successfully deleted off platform');
            }).catch(e => {
                return responseService(500, 'error', res, 'There was an error while deleting account', e);
            });
    };

    //Needs to be refactored to its own utility controller

    ratings(req, res){
        if(req.query.type == 'received'){
            Trips.find({route_creator: req.user.id, rating: { $ne: null }},{rating:1, _id:0}).then(trip => {
                responseService(200, 'success', res, 'Rating received retrieved successfully', trip);
            })
            .catch(err => {
                responseService(500, 'error', res, 'Error occured while fetching ratings', err);
            })
        }
        else {
            Trips.find({passenger: req.user.id, rating: { $ne: null }})
                .populate('passenger')
                .populate('route')
                .populate('route_creator')
                .then(trip => {
                responseService(200, 'success', res, 'Rating given retrieved successfully', trip);
            })
            .catch(err => {
                responseService(500, 'error', res, 'Error occured while fetching ratings', err);
            })
        }
       
    }

    getCars(req, res){
        Cars.find({
            'year': { "$regex": req.query.year, "$options": "i" },
            'make': { "$regex": req.query.make, "$options": "i" }
        }).then(cars => {
            return responseService(200, 'success', res, 'Acccount successfully deleted off platform', cars);
        })
        .catch(err => {
            return responseService(500, 'success', res, 'Error occured while getting cars', err);
        })
    }

    imageUpload(req, res){
        functions.cloudinary.uploader.upload(req.body.img, result => {
           Users.findById(req.user.id).then(user => {
               if(!user){
                return responseService(403, 'error', res, 'Unauthorized');
               }
               user.image = result.url
               user.save().then(() => {
                   return responseService(200, 'success', res, 'Image Successfully uploaded', result.url);
                })
           })
        })
    }

    carImageUpload(req, res){
        functions.cloudinary.uploader.upload(req.body.img, result => {
           Users.findById(req.user.id).then(user => {
               if(!user){
                return responseService(403, 'error', res, 'Unauthorized');
               }
               if(user.car){
                user.car.image = result.url
                user.save().then(() => {
                    return responseService(200, 'success', res, 'Image Successfully uploaded', result.url);
                 })
               }
               else return ;
           })
           .catch(err => {
            return responseService(500, 'error', res, 'Error while uploading car image', err);
           })
        })
    }


}

module.exports = new UserController;