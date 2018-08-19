const randomID = require('random-id');
const JWT = require('jsonwebtoken');
const secrets = require('./dbconfig/secrets');
const bcrypt = require('bcrypt-nodejs');
const _ = require('lodash');
const salt = bcrypt.genSaltSync(10);
const cloudinary = require('cloudinary');
const sgMail = require('@sendgrid/mail');
const text = require('textbelt');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

cloudinary.config({
  cloud_name: secrets.CLOUD_NAME,
  api_key: secrets.CLOUD_KEY,
  api_secret: secrets.CLOUD_SECRET
});

const texter = (options) => {

  const { phone, message } = options;

  const opts = {
    fromAddr: 'some@email.com',  // "from" address in received text
    fromName: 'joe smith',       // "from" name in received text
    region:   'intl',              // region the receiving number is in: 'us', 'canada', 'intl'
    subject:  'something'        // subject of the message
  }

  return text.sendText(phone, message, opts);
}

const mailer = (msg) => {
  
/** const msg = {
  to: 'test@example.com',
  from: 'test@example.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}; **/

  return sgMail.send(msg);
};

const encryptPayload = (payload) => {
  return JWT.sign({
    data: payload,
    expiresIn: Math.floor(Date.now() / 1000) + 360,
    iat: Math.floor(new Date(Date.now()))
  }, secrets.JWT_SECRET);
}

const requestAuthorization = (req, res, next) => {

  let bearerHeader = req.headers['authorization'];
  
  if (!_.isUndefined(bearerHeader)) {
    JWT.verify(bearerHeader, secrets.JWT_SECRET, (err, verified) => {
      if (err) {
          return res.sendStatus(403);
      }
        req.user = verified.data;
        return next();
    })
  } else return res.sendStatus(403)
}

const passwordHash = (password) => {

  let salt = bcrypt.genSaltSync(10);
  let encrypted = bcrypt.hashSync(password, salt);
  return encrypted;
}

const passwordDecrypt = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
}

const json = (status, statusText, res, message, data, meta) => {
  var response = {
    message: message
  };
  if (typeof data !== 'undefined') {
    response.data = data;
  }
  if (typeof meta !== 'undefined') {
    response.meta = meta;
  }
  if (typeof statusText !== 'undefined') {
    response.status = statusText;
  }

  return res.status(status).json(response);
}

module.exports = {
  randomID,
  hasher: passwordHash,
  decrypter: passwordDecrypt,
  encryptPayload: encryptPayload,
  requestAuthorization: requestAuthorization,
  response: json,
  cloudinary,
  mailer,
  texter
};
