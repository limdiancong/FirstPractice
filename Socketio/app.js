const io = require("socket.io-client") // the client side 

let socket = io.connect("http://localhost:3000"); // for socket at server.js


socket.on("welcome", (data) => {
    console.log("RECIEVED", data);


})