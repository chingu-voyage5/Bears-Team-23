const TripsController = require('../controllers/TripsController');
const {requestAuthorization} = require('../utils');

module.exports = (api) => {
    api.post('/trips', requestAuthorization, TripsController.create);
    api.get('/trips', requestAuthorization, TripsController.list);
}