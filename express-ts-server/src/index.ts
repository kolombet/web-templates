import * as express from 'express'
import * as http from 'http'
import * as ws from 'websocket';
import bussiness from './logic'
import {Client} from './client'
import Engine from './engine'
// import * as log from 'log';

let log = (message:string) => {
    console.log(Date.now() + " " + message);
}

let app = express()

app.get('/:time', (req, res) => {
    bussiness.greetings(parseInt(req.params.time)).then((result: string) => {
        res.send(result)
    }, (err: Error) => {
        res.status(500).send(err)
    })
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});

app.use(express.static('public'));

/** Websocket */
var webSocketsServerPort = 1337;

var history:Array<Object> = [ ];
// list of currently connected clients (users)
var clients:Array<ws.connection> = [ ];
// Array with some colors
var colors = [ 'red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange' ];
// ... in random order
colors.sort(function(a:string,b:string):number { return Math.random() - 0.5; } );
/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {
  // Not important for us. We're writing WebSocket server,
  // not HTTP server
});
server.listen(webSocketsServerPort, function() {
  log("Server is listening on port " + webSocketsServerPort);
});
/**
 * WebSocket server
 */

let engine = new Engine();
var socket = new ws.server({
  // WebSocket server is tied to a HTTP server. WebSocket
  // request is just an enhanced HTTP request. For more info 
  // http://tools.ietf.org/html/rfc6455#page-6
  httpServer: server
});
// This callback function is called every time someone
// tries to connect to the WebSocket server
socket.on('request', function(request) {
    log(`Connection from origin ${request.origin}`);
    // accept connection - you should check 'request.origin' to
    // make sure that client is connecting from your website
    // (http://en.wikipedia.org/wiki/Same_origin_policy)
    var connection = request.accept(undefined, request.origin); 
    // we need to know client index to remove them on 'close' event
    var index = clients.push(connection) - 1;
    let client = new Client(connection, engine);

    connection.on('close', function(code:number) {
            if (client.isKnown !== false) {
                log(" Peer " + code + " disconnected.");
                // remove user from the list of connected clients
                clients.splice(index, 1);
            }
        });
});