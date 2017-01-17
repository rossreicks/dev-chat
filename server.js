// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const WebSocketServer = require('websocket').server;

// Get our API routes
const api = require('./routes/api');

const app = express();

//config files
var db = require('./config/db');

//connect to mongodb database
mongoose.connect(db.url);

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

//setup CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

var wsServer = new WebSocketServer({
  httpServer: server
});

var count = 0;
var clients = {};

wsServer.on('request', function(r){
    var connection = r.accept('echo-protocol', r.origin);
    // Specific id for this client & increment count
    var id = count++;
    // Store the connection method so we can loop through & contact all clients
    clients[id] = connection
    console.log((new Date()) + ' Connection accepted [' + id + ']');

    // Create event listener
    connection.on('message', function(message) {

        // The string message that was sent to us
        var msgString = message.utf8Data;

        // Loop through all clients
        for(var i in clients){
            // Send a message to the client with the message
            clients[i].sendUTF(msgString);
        }

    });
    connection.on('close', function(reasonCode, description) {
        delete clients[id];
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });

});