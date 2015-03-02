(function (routesConfig) {

    var auth = require('./auth');

    routesConfig.init = function (app) {
        app.get('/partials/*', function (req, res) {
            res.render('../../public/app/' + req.params[0]);
        });

        app.post('/login', auth.authenticate);

        // Catch all route, e.g. let the client handle the actual routing
        app.get('*', function (req, res) {
            res.render('index');
        });
    };

}(module.exports));
