const AuthController = require('../controllers/AuthController');
const {requestAuthorization} = require('../utils');

module.exports = (api) => {
    api.post('/signup', AuthController.signup);
    api.post('/login', AuthController.login);
    api.put('/password/change', requestAuthorization, AuthController.changePassword);
}