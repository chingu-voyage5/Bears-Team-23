const RoutesController = require('../controllers/RoutesController');
const {requestAuthorization} = require('../utils');

module.exports = (api) => {
    api.post('/route', RoutesController.create);
}