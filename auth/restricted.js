const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/secrets.js'); //secret string
module.exports = function restricted(req, res, next) {
    const {authorization} = req.headers;
    if (authorization) { //the token header that comes in through client w/ axiosWithAuth
        jwt.verify(authorization, jwtSecret, (error, decodedToken) => {//sign w/ secret
           if (error) { //error argument will be null if there is no error
               res.status(401).json({message: 'Invalid Credentials'});
           } else {
               req.decodedToken = decodedToken;
               next(); //e.g. display users
           }
        });
    } else {
        res.status(400).json({message: 'No credentials provided'}); //You are not authorized.
    }
};