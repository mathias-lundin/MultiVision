(function (passportConfig) {

    var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        mongoose = require('mongoose'),
        User = mongoose.model('User');

    passportConfig.init = function () {
        passport.use(new LocalStrategy(
            function (username, password, done) {
                User.findOne({ username: username }).exec(function (err, user) {
                    return done(null, (user && user.authenticate(password) ? user : false));
                });
            }
        ));

        passport.serializeUser(function (user, done) {
            if (user) {
                done(null, user._id);
            }
        });

        passport.deserializeUser(function (id, done) {
            User.findOne({ _id: id }).exec(function (err, user) {
                return done(null, (user ? user : false));
            });
        });
    };

}(module.exports));