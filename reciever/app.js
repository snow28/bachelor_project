const express = require('express');
const path = require('path'); // core module
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const config = require('./config/database');
const passport = require('passport');


var io = require('socket.io-client'); // i will use this module to maintain communication between server

mongoose.connect(config.database);
let db = mongoose.connection;

//check db connection

db.once('open' , function(){
    console.log('Connected to MongoDB');
});

//check for db errors
db.on('error' , function(err){
    console.log(err);
});


//init appa
const app = express();

//bring in our models
let Package = require('./models/package');
let User = require('./models/user');


var socket = io.connect("http://localhost:4000/", {
    reconnection: true
});



// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));


// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

//Passport config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


//we will use this variable to identify if user logged in
app.get('*' , function(req,res,next){
    res.locals.user = req.user || null;
    next();
});



//we will set all routes in separate file

let routes = require('./routes/routes');
app.use('/',routes);




//recieve data from SENDER server
socket.on('connect', function () {
    console.log('connected to localhost:4000');
    socket.on('clientEvent', function (data) {
        console.log('message from the server:', data);
        //socket.emit('serverEvent', "thanks server! for sending '" + data + "'");
        var package = new Package();
        var date = new Date();
        package.group = 'main';
        package.value = data;
        package.time = date;
        package.save(function(err){
            if(err){
                console.log(err);
                return;
            }else{
                console.log('Package  was saved successfully!');
            }
        });
    });
});



// Start Server
app.listen(3000, function(req, res){
    console.log('Server started on port 3000...');
});










