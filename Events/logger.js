const Eventemitter = require('events'); //call events library

class Logger extends Eventemitter {
    test(message) {
        //flow 2
        //send an http request 
        console.log(message);

        //raise an events
        this.emit('messageLogged', { id: 1, data: message });
        //flow 3
    }


}


module.exports = Logger; // exports class
