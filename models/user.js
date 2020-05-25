// will track user name and password and a flag will be set to indicate  whether the user is  a administrator or normal user

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password:  {
        type: String,
        required: true
    },
    admin:   {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', User); 