const _ = require('lodash');
const Promise = require('bluebird');
const Users = require('../models/users');
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
        Users.findById(req.params.id).populateAll().then(user=>{
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

    imageUpload(req, res){
        functions.cloudinary.uploader.upload(req.body.img, result => {
           Users.findById(req.user.id).then(user => {
               if(!user){
                return responseService(403, 'error', res, 'Unauthorized');
               }
               user.image = result.url
               user.save().then(() => {
                   responseService(200, 'success', res, 'Image Successfully uploaded', result.url);
                })
           })
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
    



}

module.exports = new UserController;