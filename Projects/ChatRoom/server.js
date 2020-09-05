const path = require('path');
const express = require('express');
const http = require('http');
const io = require('socket.io');
const formatMessage = require("./utils/messages")
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require("./utils/user")

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app); // use http server straight 
const socketio = io(server);


//set static folder 
app.use(express.static(path.join(__dirname, 'public'))); //call html at public folder 
//name for botname
const botname = "Chat Bot";
//run when client connects 
//a listener 
socketio.on('connection', socket => {

    //listen when joiing room
    socket.on("joinRoom", ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        //partition the room in thes server 
        socket.join(user.room);

        //broadcast to a single client 
        socket.emit("message", formatMessage(botname, `Welcome to ${user.room} Chat Room`));

        //broadcast when user connects 
        //.to is for specific room 
        socket.broadcast.to(user.room).emit('message', formatMessage(botname, `${user.username} has joined the chat`));
        //only broadcast to the clients that is connected

        // send users and room info
        socketio.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });

    })

    // socketio.emit()
    //broadcast to all the clients

    //listen for chat message 
    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);
        console.log(user);
        socketio.to(user.room).emit("message", formatMessage(getCurrentUser(socket.id).username, msg)); //broadcast to ewveryone 

    })

    //runs when client disconnects
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);


        if (user) {
            socketio.to(user.room).emit("message", formatMessage(botname, `${user.username} have left the chat`));

            // send users and room info
            socketio.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });


})


// app change with server, still works 
server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

