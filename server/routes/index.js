'use strict';

var validateToken  = require('./../controllers/auth').validateToken;
var fs = require('fs');

/**
 * Set all routes for API on the app object using the Router object
 */
module.exports = function (app, router) {

    /**
     * Middle ware to check for token to authenticate user
     *
     * sets req.user to user object if token is valid
     */
    router.use(validateToken);

    /**
     * dynamically load all the routes
     *
     * this will only happen upon booting up app
     *
     * @param  {String} file :: file to require
     * @require each file in current directory
     */
    fs.readdirSync(__dirname + '/').forEach(function(file){
        if ( file !== 'index.js') {
            var name = file.replace('.js', '');
            console.log(name);
            require('./' + file)(app, router);
        }
    });

    /**
     *  Set the routes to have /api appended before them
     *
     */
    app.use('/api', router);

    return app;
}