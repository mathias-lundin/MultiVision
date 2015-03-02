(function (mongooseConfig) {

    var mongoose = require('mongoose');

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
        username: String
    });

    var User = mongoose.model('User', userSchema);
    User.find({}).exec(function (err, collection) {
        if(collection.length === 0){
            User.create({ firstName: 'Mathias', lastName: 'Lundin', username: 'mathias' });
            User.create({ firstName: 'John', lastName: 'Papa', username: 'john' });
            User.create({ firstName: 'Dan', lastName: 'Wahlin', username: 'dan' });
        }
    });

}(module.exports));


/*var messageSchema = mongoose.Schema({ message: String });
 var Message = mongoose.model('Message', messageSchema);
 var mongoMessage;
 Message.findOne().exec(function (err, messageDoc) {
 mongoMessage = messageDoc.message;
 });*/
