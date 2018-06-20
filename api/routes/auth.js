const AuthController = require('../controllers/AuthController');
const {requestAuthorization} = require('../utils');

module.exports = (api, Users) => {
    api.post('/signup', AuthController.signup);
    api.post('/login', AuthController.login);
    api.delete('/delete', requestAuthorization, AuthController.delete);
}