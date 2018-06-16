const randomID = require('random-id');
const JWT = require('jsonwebtoken');
const secrets = require('./dbconfig/secrets');
const bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(10);

const encryptPayload = (payload) => {

  return JWT.sign({
    data: payload,
    exp: Math.floor(Date.now() / 1000) + 360,
    iat: Math.floor(new Date(Date.now()))
  }, secrets.JWT_SECRET)

}

const requestAuthorization = (req, res, next) => {

  let bearerToken;
  let bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {

    bearerToken = bearerHeader.split(' ')[1]
    req.token = bearerToken;

    JWT.verify(bearerToken, secrets.JWT_SECRET, (err, verified) => {

      if (err) {
          return res.sendStatus(403);
      }
      if (verified) {
        return next();
      }
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


module.exports = {
  randomID: randomID,
  hasher: passwordHash,
  decrypter: passwordDecrypt,
  encryptPayload: encryptPayload,
  requestAuthorization: requestAuthorization,
}
