const Eventemitter = require('events');

// function test(name){

// console.log(name)
// }
class Logger extends Eventemitter {
    test(message) {
        console.log(message);
        this.emit('messageLogged', { id: 1, data: message });
    }


}


module.exports = Logger; // export only function
//mopdule.export.fucntionname = function // exports object and fucntion
// console.log(module);




// test("testing 123");