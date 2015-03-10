(function (routesConfig) {

    var auth = require('./auth'),
        users = require('../controllers/users'),
        courses = require('../controllers/courses'),
        mongoose = require('mongoose'),
        User = mongoose.model('User');

    routesConfig.init = function (app) {

        app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
        app.post('/api/users', users.createUser);
        app.put('/api/users', users.updateUser);

        app.get('/api/courses', courses.getCourses);
        app.get('/api/courses/:id', courses.getCourseById);

        app.get('/partials/*', function (req, res) {
            res.render('../../public/app/' + req.params[0]);
        });

        app.post('/login', auth.authenticate);

        app.post('/logout', auth.logout);

        app.all('/api/*', function (req, res) {
           res.sendStatus(404);
        });

        // Catch all route, e.g. let the client handle the actual routing
        app.get('*', function (req, res) {
            res.render('index', {
                bootstrappedUser: req.user
            });
        });
    };

}(module.exports));