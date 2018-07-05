const RoutesController = require('../controllers/RoutesController');
const {requestAuthorization} = require('../utils');

module.exports = (api) => {
    api.post('/route', requestAuthorization, RoutesController.create);
    api.get('/route', requestAuthorization, RoutesController.list);
    api.get('/find', RoutesController.tripSearch);
}