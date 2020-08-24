const Logger = require("./logger"); // call Logger class 
const logger = new Logger(); //create new instances

//register a listener 
logger.on("messageLogged", (arg) => {
    //flow 4

    console.log("Listen", arg);

})


logger.test("test 1"); //flow 1 





