(function (expressConfig) {

    var express = require('express'),
        session = require('express-session'),
        stylus = require('stylus'),
        logger = require('morgan'),
        cookieParser = require('cookie-parser'),
        bodyParser = require('body-parser'),
        passport = require('passport'),
        mongoose = require('mongoose'),
        LocalStrategy = require('passport-local').Strategy;

    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

    expressConfig.init = function (app, config) {
        app.set('views', config.rootPath + '/server/views');
        app.set('view engine', 'jade');

        app.use(logger('dev'));
        app.use(cookieParser());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
        app.use(session({ secret: 'multi vision unicorns', saveUninitialized: true, resave: true }));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(stylus.middleware({ src: config.rootPath + '/public', compile: compile }));
        app.use(express.static(config.rootPath + '/public'));

        var User = mongoose.model('User');
        passport.use(new LocalStrategy(
            function (username, password, done) {
                User.findOne({ username: username }).exec(function (err, user) {
                    //return done(null, (user ? user : false));
                    if (user) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
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
                //return done(null, (user ? user : false));
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        });
    };

}(module.exports));


