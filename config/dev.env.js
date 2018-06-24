'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  MAPBOX_API_KEY: 'pk.eyJ1IjoicGlldHJvc3BhcmtzIiwiYSI6ImNqaXAzNWdzMDBpY3MzdnFtY3I4MHVlZnMifQ.Nw1ZOn0QiQxiX66dL9lcfw',
  GEOKEY: '2a6cb3c723d145b2b27481ff020f58ee',
  BASEURL_DEV:'http://localhost:5000/api'
});