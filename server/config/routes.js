(function (routesConfig) {

    var auth = require('./auth'),
        mongoose = require('mongoose'),
        User = mongoose.model('User');

    routesConfig.init = function (app) {

        app.get('/api/users', auth.requiresRole('admin'), function (req, res) {
            User.find({}).exec(function (err, collection) {
                res.send(collection);
            })
        });

        app.get('/partials/*', function (req, res) {
            res.render('../../public/app/' + req.params[0]);
        });

        app.post('/login', auth.authenticate);

        app.post('/logout', auth.logout);

        // Catch all route, e.g. let the client handle the actual routing
        app.get('*', function (req, res) {
            res.render('index', {
                bootstrappedUser: req.user
            });
        });
    };

}(module.exports));