// src/utils/EventBus.js
import { EventEmitter } from 'events';

// EventBus to facilitate event-based communication
class EventBus extends EventEmitter {}

export const eventBus = new EventBus();

// WebSocket server setup
const webSocketServer = require("websocket").server;
const http = require("http");

const webSocketsServerPort = 8000;
const server = http.createServer();
server.listen(webSocketsServerPort, () => {
  console.log("WebSocket server listening on port 8000...");
});

const wsServer = new webSocketServer({
  httpServer: server,
});

const generateID = () => "id" + Math.random().toString(16).slice(2);
const connectedUsers = {};

wsServer.on("request", function (request) {
  // Generate a unique user ID for each connection
  var id = generateID();
  console.log("Connection request from " + request.origin + ".");

  // Accept the WebSocket connection
  const connection = request.accept(null, request.origin);
  connectedUsers[id] = connection;  // Store the connection

  console.log("Connection established with ID: " + id);

  // When a message is received from the client
  connection.on("message", function (message) {
    console.log("Received message: ", message.utf8Data);

    // Parse the message
    const data = JSON.parse(message.utf8Data);

    // Broadcast message to all connected clients
    for (let userId in connectedUsers) {
      connectedUsers[userId].sendUTF(message.utf8Data);
    }

    // Emit the message event to the EventBus for micro-frontends (like Chat, Email)
    eventBus.emit('newMessage', data); // Pass the message to the EventBus
  });

  // Handle user disconnection
  connection.on("close", function () {
    console.log("Connection closed with ID: " + id);
    delete connectedUsers[id];  // Remove user from the list on disconnection
  });
});
