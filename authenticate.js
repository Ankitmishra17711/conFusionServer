var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');



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

    exports.verifyUser = function (req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, config.secretKey, function (err, decoded) {
                if (err) {
                    var err = new Error('You are not authenticated!');
                    err.status = 401;
                    return next(err);
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            var err = new Error('No token provided!');
            err.status = 403;
            return next(err);
        }
    };
    
    exports.verifyAdmin = function (req, res, next) {
        if (req.user.admin) {
            next();
        } else {
            var err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        }
    }

exports.verifyUser = passport.authenticate('jwt', {session: false});