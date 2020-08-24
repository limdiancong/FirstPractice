const http = require('http'); // call http library 

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write("hello world"); //will show up "hello word on browser"
        res.end();
    }

    if(req.url==='/api/courses'){

        res.write(JSON.stringify([[1,2,3,4,5],2,3,4]));
        res.end();
    }
}); //create server and also a callback function 
    //callback function open a browser at localhost://3000


server.listen(3000); //Starts the HTTP server listening for connections.

console.log("listening on port 3000");
