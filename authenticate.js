var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

//configuring pasport with local strategy

passport.use(new LocalStrategy(User.authenticate())); // here username password will get extract from the incoming request to get authentictae
// User.authenticate -will provide the authentication for the loaclStrategy

passport.serializeUser(User.serializeUser()); // since we use session to track user in our application so we need to serialize amd deserialize the user
passport.deserializeUser(User.deserializeUser());