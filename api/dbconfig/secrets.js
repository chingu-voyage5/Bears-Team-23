require('dotenv').load()

let MONGODB;
let BASEURL;

if (process.env.NODE_ENV == 'production'){
    MONGODB = process.env.MONGODB_URI;
    BASEURL = process.env.BASEURL_PROD;
}
else{
    MONGODB = process.env.MONGODB_DEV;
    BASEURL = process.env.BASEURL_DEV
}

module.exports = {
    DATABASE: MONGODB,
    BASEURL:BASEURL,
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_KEY: process.env.CLOUD_KEY,
    CLOUD_SECRET: process.env.CLOUD_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    MAPBOX: process.env.MAPBOX_API_KEY,
    GEOKEY: process.env.GEOKEY
}