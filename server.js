var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/mongoose').init(config);
require('./server/config/express').init(app, config);
require('./server/config/passport').init();
require('./server/config/routes').init(app);

app.listen(config.port);

if (env === 'development') {
    console.log('Listening on port ' + config.port + '...');
}