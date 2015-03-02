var express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/mongoose').init(config);
require('./server/config/express').init(app, config);
require('./server/config/routes').init(app);

app.listen(config.port);
console.log('Listening on port ' + config.port + '...');