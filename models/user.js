// will track user name and password and a flag will be set to indicate  whether the user is  a administrator or normal user

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var  passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
 admin:   {
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalMongoose);



module.exports = mongoose.model('User', User); 