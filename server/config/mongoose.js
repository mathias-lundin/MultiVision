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

}(module.exports));


/*var messageSchema = mongoose.Schema({ message: String });
 var Message = mongoose.model('Message', messageSchema);
 var mongoMessage;
 Message.findOne().exec(function (err, messageDoc) {
 mongoMessage = messageDoc.message;
 });*/
