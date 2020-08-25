const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        //....
        res.write('hello world');
    }

    if (req.url === '/api/courses') {

        //....
    }


});

server.listen(3000);
console.log("connecting to 3000");