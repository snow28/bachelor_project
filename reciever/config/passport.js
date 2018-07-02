const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('./database');


module.exports = function(passport){
    //Local Strategy
    passport.use(new LocalStrategy(function(username, password, done){
        //Match username
        let query = {
            username : username
        };
        User.findOne(query , function(err, user){
            if(err)throw err;
            if(!user){
                return done(null,false,{
                    message : 'No user found'
                });
            }
            //Match Password
            if(password == user.password){
                return done(null , user);
            }else{
                return done(null,false,{
                    message : 'Wrong Password'
                });
            }
        });
    }));


    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}


