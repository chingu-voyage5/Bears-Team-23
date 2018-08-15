const RidesController = require('../controllers/RidesController');
const { requestAuthorization } = require('../utils');

module.exports = (api) => {
    api.post('/route', requestAuthorization, RidesController.create);
    api.get('/rides', requestAuthorization, RidesController.list);
    api.get('/find', RidesController.tripSearch);
}