const express = require('express');
const path = require('path'); // core module
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bachelor_project');
let db = mongoose.connection;

//check db connection

db.once('open' , function(){
    console.log('Connected to MongoDB');
});

//check for db errors
db.on('error' , function(err){
    console.log(err);
});

var io = require('socket.io-client'); // i will use this module to maintain communication between server

//init appa
const app = express();

//bring in our package model
let Package = require('./models/package');


var socket = io.connect("http://localhost:4000/", {
    reconnection: true
});


//recieve data from SENDER server
socket.on('connect', function () {
    console.log('connected to localhost:4000');
    socket.on('clientEvent', function (data) {
        console.log('message from the server:', data);
        //socket.emit('serverEvent', "thanks server! for sending '" + data + "'");
    });
});


// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



// HOME ROUTE
app.get('/' , function(req, res){
    res.render('index' , {
        title : "hello"
    });
});


// Start Server
app.listen(3000, function(req, res){
    console.log('Server started on port 3000...');
});














