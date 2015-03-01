var path = require('path'),
    rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mongodb://localhost/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production: {
        db: 'mongodb://mlundin:password@ds039331.mongolab.com:39331/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
};