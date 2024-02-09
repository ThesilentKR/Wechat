var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(4000, function(){
    console.log('Escuchando por el puerto: 4000,');
});

app.use(express.static('public'));

var io = socket(server);
io.on('connection', (socket) => {

    console.log('Conexion establecida usuario:', socket.id);

    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
