const express = require('express');
const app = express();
const port = process.env.PORT || 3000; //create port
const http = require('http').createServer() //createserver 

const io = require('socket.io')(http); //pass the server to io 


io.on("connection", (socket) => { //socket is at app.js 
    socket.emit("welcome", "Hello there, welcome to the socket io server ")
    //welcome is the event name
    console.log("New Client i9s connected ");
})

http.listen(port, () => {
    console.log("listing on port :" + port + " ...");
})

// this files doesnt use express but can user app.listen to use it as server 