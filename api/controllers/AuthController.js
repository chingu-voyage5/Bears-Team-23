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
                    req.body.password = functions.hasher(req.body.password);
                    const new_user = new Users(req.body);
                    new_user.save()
                        .then(user => {
                            delete req.body.password;
                            return responseService(200, 'error', res, `Successfully Signed Up ${user.role}`, req.body);
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
            .then(user => {
                if (!user) {
                    return responseService(401, 'error', res, 'Auth Error', null);
                }
                if (functions.decrypter(req.body.password, user.password)) {
                    const token = functions.encryptPayload({
                        email: user.email,
                        id: user._id
                    });
                    user = user.toJSON();
                    user.token = token;
                    //Delete Password & Token  so its not returned in the object to the user
                    delete user.password;
                    //Bind token to a custom header
                    return responseService(200, 'success', res, 'User retrieved successfully', user);
                }
            })
            .catch(e => {
                return responseService(500, 'error', res, 'There was an error while trying to login', null, e);
            })
    };

    changePassword(req, res){
        Users.findById(req.user.id).then(user => {
            if(functions.decrypter(req.body.current, user.password)){
                const newPassword = functions.hasher(req.body.new)
                user.password = newPassword;
                user.save().then(() => {
                    return responseService(200, 'success', res, 'Successfully updated Password')
                })
                .catch(e => {
                    return responseService(500, 'error', res, 'Error occured while saving user', e)
                })
            }
            else return responseService(403, 'error', res, 'Password Incorrect')
        })
    }


}

module.exports = new AuthController;