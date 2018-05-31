var five = require("johnny-five");
var express = require('express');
var app = express();
const path = require('path');
var fs = require('fs');
var forceSsl = require('express-force-ssl'); 
var key = fs.readFileSync('privateKey.key').toString();
var cert = fs.readFileSync('certificate.crt').toString();
var options = {
    key: key,
    cert: cert
};

app.use(forceSsl);
app.use(express.static(__dirname + '/'));
var https = require('https').createServer(options, app);
var io = require('socket.io')(https);



app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
    console.log("conectado");
})


https.listen(8100, '192.168.1.13', function () {
    console.log("corriendo");
});