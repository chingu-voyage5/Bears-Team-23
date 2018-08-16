const UserController = require('../controllers/UserController');
const { requestAuthorization } = require('../utils');

module.exports = (api) => {
    api.get('/user', requestAuthorization, UserController.list);
    api.get('/user/:id', requestAuthorization, UserController.view);
    api.put('/user', requestAuthorization, UserController.update);
    api.delete('/user/:id', requestAuthorization, UserController.delete);
    api.post('/user/upload', requestAuthorization, UserController.imageUpload);
    api.get('/cars', requestAuthorization, UserController.getCars);
    api.get('/ratings', requestAuthorization, UserController.ratings);
};