const express = require('express');
const router = express.Router();
var expressValidator = require('express-validator');
const passport = require('passport');



//bring in our models
let Package = require('../models/package');
let User = require('../models/user');

// HOME ROUTE
router.get('/' , function(req, res){
    res.render('index');
});



router.get('/register' , function(req, res){
    res.render('register');
});

//register process
router.post('/register' , function(req , res){
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;
    const name = req.body.name;
    const email = req.body.email;

    var validate = true;

    if(password2 != password){
        validate = false;
        console.log('Passwords are not the same');
    }else if(username.length < 5){
        validate = false;
        console.log('Username have to be at least 5 char length');
    }


    if(validate){
        let newUser = new User({
            username : username,
            password : password
        });
        newUser.save(function(err){
            if(err){
                console.log(err);
                return;
            }else{
                //alert('User registered');
                res.redirect('/login');
            }
        });
    }else{
        res.redirect('/register');
    }

});



router.get('/login' , function(req, res){
    res.render('login');
});

//login process

router.post('/login',function(req , res , next){
    passport.authenticate('local' , {
        successRedirect : '/data',
        failureRedirect : '/login'
    })(req,res,next);
});


router.get('/logout', function(req,res){
    req.logout();
});


router.get('/data' , function(req, res){
    Package.find({},function(err , packages){
        if(err){
            console.log(err);
        }else{
            res.render('data' , {
                packages : packages
            });
        }
    });
});




router.delete('/packageDelete/:id' , function(req, res){
    let query = {_id : req.params.id};

    Package.remove(query, function(err){
        if(err){
            console.log(err);
        }
        res.send('Success'); // by default send 200 state - OK
    });
});






module.exports =  router;
