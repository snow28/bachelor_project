const express = require('express');
const path = require('path'); // core module

//init app
const app = express();




var io = require('socket.io').listen(4000);



io.on('connection', function (socket) {

    console.log('connected:', socket.client.id);

    socket.on('serverEvent', function (data) {
        console.log('new message from client:', data);
    });

    setInterval(function () {
        socket.emit('clientEvent', {
            group : 'Thread-1',
            value : Math.random(),
            text_value : "Thread-1"
        });
        console.log('message sent to the clients');
    }, 1000);

    setInterval(function () {
        socket.emit('clientEvent', {
            group : 'Thread-2',
            value : Math.random(),
            text_value : "Thread-2"
        });
        console.log('message sent to the clients');
    }, 1500);


});



// Start Server
/*app.listen(4000, function(req, res){
    console.log('Server started on port 4000...');
});*/














