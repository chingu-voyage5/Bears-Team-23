const _ = require('lodash');
const Promise = require('bluebird');
const Users = require('../models/users');
const functions = require('../utils');
const responseService = functions.response;

class AuthController {

    signup(req, res) {
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
                    user.tokens.push({
                        access: 'auth',
                        token: token
                    });
                    user = user.toObject();
                    //Delete Password & Token  so its not returned in the object to the user
                    delete user['password'];
                    //Bind token to a custom header
                    return responseService(200, 'success', res, 'User retrieved successfully', user);
                }
            })
            .catch(e => {
                return responseService(500, 'error', res, 'There was an error while trying to login', null, e);
            })
    };

    delete(req, res) {
        //Use UserID decoded from the JWT token in the header
        Users.findByIdAndRemove(req.user.id)
            .exec()
            .then(user => {
                return responseService(200, 'success', res, 'Acccount successfully deleted off platform');
            }).catch(e => {
                return responseService(500, 'error', res, 'There was an error while deleting account', e);
            });
    }


}

module.exports = new AuthController;