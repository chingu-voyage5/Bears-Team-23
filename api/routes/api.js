const functions = require('../utils');
const _ = require('lodash');
const secret= require ('../dbconfig/secrets');
const Users = require('../models/users');
const Trips = require('../models/trips');
const Routes = require('../models/routes');


module.exports = (express)=>{

    const api = express.Router();

    require('./auth')(api)
    require('./rides')(api)
    require('./trips')(api)
    require('./user')(api)

    return api;
}