const express = require('express');
const path = require('path');
require('dotenv').config();

// app de express
const app = express();

// servidor de sockect.io | nodeserver
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./src/sockets/socket');


// path publico
const publicPath = path.resolve(__dirname, 'src/public');

app.use(express.static(publicPath));

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('Servidor corriendo en puerto:', process.env.PORT);
});