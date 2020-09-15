const express = require('express');
const http = require('http');
const io = require('socket.io');

const app = express();
app.set('view-engine', 'ejs'); // set to use ejs
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const socketio = io(server);


test = 1;
app.get("/", (req, res) => {
    res.render('index.ejs', { data: test });
})

app.get("/register", (req, res) => {

    res.render('register.ejs');
})

app.get("/:query", (req, res) => {

    res.render('name.ejs', { data: req.params.query });
})
socketio.on('connection', socket => {
    console.log("welcome" + socket.id)

})



server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
