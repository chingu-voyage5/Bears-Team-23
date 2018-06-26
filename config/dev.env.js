'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASEURL_DEV:'"http://localhost:5000/api"',
  GEOKEY: '2a6cb3c723d145b2b27481ff020f58ee',
});