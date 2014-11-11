'use strict';

var jwt = require('jwt-simple');

var tokenConfig = require('./../../config').token;


module.exports =  function (req, res, next) {
    if(req.headers.auth){
        var token = req.headers.auth;

        try {
            var decodedToken = jwt.decode(token, tokenConfig.secret);

            req.user = decodedToken.user;

            return next();

        } catch (err) {
            return res.send(401, 'not a valid token');
        }

    } else {
        return res.send(401);
    }

    next();
};