var express = require('express'),
    env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    app = express();

var config = require('./server/config/config')[env];

require('./server/config/express').init(app, config);
require('./server/config/mongoose').init(config);
require('./server/config/routes').init(app);

app.listen(config.port);
console.log('Listening on port ' + config.port + '...');