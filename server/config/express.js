(function (expressConfig) {

    var express = require('express'),
        stylus = require('stylus'),
        logger = require('morgan'),
        bodyParser = require('body-parser');

    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

    expressConfig.init = function (app, config) {
        app.set('views', config.rootPath + '/server/views');
        app.set('view engine', 'jade');

        app.use(logger('dev'));
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(stylus.middleware(
            {
                src: config.rootPath + '/public',
                compile: compile
            }
        ));
        app.use(express.static(config.rootPath + '/public'));
    };


}(module.exports));


