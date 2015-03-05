var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: {type: String, required: '{PATH] is required!'},
    lastName: {type: String, required: '{PATH] is required!'},
    username: {
        type: String,
        required: '{PATH] is required!',
        unique: true
    },
    salt: {type: String, required: '{PATH] is required!'},
    hashed_pwd: {type: String, required: '{PATH] is required!'},
    roles: [String]
});
userSchema.methods = {
    authenticate: function (passwordToMatch) {
        return encrypt.hashPassword(this.salt, passwordToMatch) === this.hashed_pwd;
    }
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function (err, collection) {
        if (collection.length > 0) return;

        var salt,
            hash;

        salt = encrypt.createSalt();
        hash = encrypt.hashPassword(salt, 'mathias');
        User.create({
            firstName: 'Mathias',
            lastName: 'Lundin',
            username: 'mathias',
            salt: salt,
            hashed_pwd: hash,
            roles: ['admin']
        });

        salt = encrypt.createSalt();
        hash = encrypt.hashPassword(salt, 'john');
        User.create({
            firstName: 'John',
            lastName: 'Papa',
            username: 'john',
            salt: salt,
            hashed_pwd: hash,
            roles: []
        });

        salt = encrypt.createSalt();
        hash = encrypt.hashPassword(salt, 'dan');
        User.create({
            firstName: 'Dan',
            lastName: 'Wahlin',
            username: 'dan',
            salt: salt,
            hashed_pwd: hash
        });
    });
}

exports.createDefaultUsers = createDefaultUsers;