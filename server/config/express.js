(function (expressConfig) {

    var express = require('express'),
        session = require('express-session'),
        stylus = require('stylus'),
        logger = require('morgan'),
        cookieParser = require('cookie-parser'),
        bodyParser = require('body-parser'),
        passport = require('passport');

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
        app.use(session({ secret: 'multi vision unicorns', saveUninitialized: false, resave: false }));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(stylus.middleware({ src: config.rootPath + '/public', compile: compile }));
        app.use(express.static(config.rootPath + '/public'));
    };

}(module.exports));


