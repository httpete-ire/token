var User = require('./../../models/user.js');


/**
 * Register a user, if a user already exists return a conflict HTTP status
 *
 * @url :: '/auth/register'
 * @return {HTTP status} :: 200
 */
module.exports =  function login (req, res, next) {

    User.findOne({email: req.body.email}, function (err, user) {

        if(user) {
            res.status(403).send(req.body.email + ' is already taken');
        } else {
            var user = new User({
                email: req.body.email,
                password: req.body.password
            });

            user.save(function(err){
                if(err) {
                    return res.send(err);
                }

                return res.send(200);
            });
        }
    });
};