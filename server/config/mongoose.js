(function (mongooseConfig) {

    var mongoose = require('mongoose'),
        crypto = require('crypto');

    function createSalt() {
        return crypto.randomBytes(128).toString('base64');
    }

    function hashPassword(salt, password) {
        var hmac = crypto.createHmac('sha1', salt);
        return hmac.update(password).digest('hex');
    }

    mongooseConfig.init = function (config) {
        mongoose.connect(config.db);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error...'));
        db.once('open', function callback() {
            console.log('multivision db opened');
        });
    };

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        salt: String,
        hashed_pwd: String,
        roles: [String]
    });
    userSchema.methods = {
      authenticate: function (passwordToMatch) {
          return hashPassword(this.salt, passwordToMatch) === this.hashed_pwd;
      }
    };

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function (err, collection) {
        if(collection.length === 0){
            var salt,
                hash;

            salt = createSalt();
            hash = hashPassword(salt, 'mathias');
            User.create({ firstName: 'Mathias', lastName: 'Lundin', username: 'mathias', salt: salt, hashed_pwd: hash, roles: ['admin'] });

            salt = createSalt();
            hash = hashPassword(salt, 'john');
            User.create({ firstName: 'John', lastName: 'Papa', username: 'john', salt: salt, hashed_pwd: hash, roles: [] });

            salt = createSalt();
            hash = hashPassword(salt, 'dan');
            User.create({ firstName: 'Dan', lastName: 'Wahlin', username: 'dan', salt: salt, hashed_pwd: hash });
        }
    });

}(module.exports));


/*var messageSchema = mongoose.Schema({ message: String });
 var Message = mongoose.model('Message', messageSchema);
 var mongoMessage;
 Message.findOne().exec(function (err, messageDoc) {
 mongoMessage = messageDoc.message;
 });*/
