const _ = require('lodash');
const Promise = require('bluebird');
const Users = require('../models/users');
const functions = require('../utils');
const responseService = functions.response;

class AuthController {

    signup(req, res) {
        console.log(req.body,'jw')
        Users.findOne({
                email: req.body.email
            })
            .exec()
            .then(user => {
                if (user) {
                    return responseService(409, 'error', res, 'Mail Exists', null);
                } else {
                    const User = {
                        first_name: req.body.firstname,
                        last_name: req.body.lastname,
                        email: req.body.email,
                        role: req.body.role,
                        password: functions.hasher(req.body.password)
                    };
                    const new_user = new Users(User);
                    new_user
                        .save()
                        .then(user => {
                            user = user.toObject();
                            delete user['password'];
                            return responseService(200, 'error', res, `Successfully Signed Up ${user.role}`, user);
                        })
                }
            })
            .catch(e => {
                return responseService(500, 'error', res, 'There was an error', null, e);
            })
    };

    login(req, res) {

        Users.findOne({
                email: req.body.email
            })
            .exec()
            .then(user => {
                if (!user) {
                    return responseService(401, 'error', res, 'Auth Error', null);
                } else if (functions.decrypter(req.body.password, user.password)) {
                    const token = functions.encryptPayload({
                        email: user.email,
                        id: user._id
                    });
                    
                    user = user.toJSON();
                    user.token = token;

                    //Delete Password & Token  so its not returned in the object to the user
                    delete user.passwords;
                    //Bind token to a custom header
                    return responseService(200, 'success', res, 'User retrieved successfully', user);
                }
                
                
            })
            .catch(e => {
                return responseService(500, 'error', res, 'There was an error while trying to login', null, e);
            })
    };


}

module.exports = new AuthController;