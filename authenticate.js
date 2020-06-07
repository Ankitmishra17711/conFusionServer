var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
var FacebookTokenStratrgy = require('passport-facebook-token');



var config = require('./config');


//configuring pasport with local strategy

exports.local=passport.use(new LocalStrategy(User.authenticate())); // here username password will get extract from the incoming request to get authentictae
// User.authenticate -will provide the authentication for the loaclStrategy

passport.serializeUser(User.serializeUser()); // since we use session to track user in our application so we need to serialize amd deserialize the user
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user){ // help to create the json web token
      return jwt.sign(user, config.secretKey,
        {expiresIn:3600}) ;
};
var opts = {};
opts.jwtFromRequest =  ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey =    config.secretKey; //help to supply the secret key

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) { 
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

    exports.verifyUser =  passport.authenticate('jwt', {session: false});
    
    exports.verifyAdmin = function (req, res, next) {
        if (req.user.admin) {
            next();
        } else {
            var err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        }
    };
    
    exports.facebookPassport = passport.use(new 
        FacebookTokenStratrgy({
        clientID: config.facebook.clientId,
        clientSecret: config.facebook.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({facebookId: profile.id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (!err && user !== null) {
                return done(null, user);
            }
            else {
                user = new User({ username: profile.displayName });
                user.facebookId = profile.id;
                user.firstname = profile.name.givenName;
                user.lastname = profile.name.familyName;
                user.save((err, user) => {
                    if (err)
                        return done(err, false);
                    else
                        return done(null, user);
                })
            }
        });
    }
));
