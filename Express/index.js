//expresjs.com for more info
const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());
//express doesnt alllow json so use this 

let courses = [
    { id: 1, name: 'Course 1' },
    { id: 2, name: 'Course 2' },
    { id: 3, name: 'Course 3' }
]

// function for rest api
// app.get();
// app.post();
// app.put();
// app.delete();

//this is a route '/' is default
app.get("/", (req, res) => {
    res.send('hello world!!!!')
});


//this is a route '/api/courses' is default
app.get("/api/courses", (req, res) => {
    res.send(courses);
});


// /api/courses/1 for 1 param
app.get('/api/courses/:id', (req, res) => {
    // read param 
    // using array function find to return true or false 
    let course = courses.find(c => c.id === parseInt(req.params.id));
    //404 if not found.
    if (!course) return res.status(404).send('The course with the given ID is not found');

    // send if found 
    res.send(course);
});

// for multiple param using req.param
app.get('/api/courses/:id/:year/:month', (req, res) => {
    // read route param 
    res.send(req.params);
});

// for multiple param usinbg req query
app.get('/api/courses/:year/:month', (req, res) => {
    // read route param and query
    //return "?SortBy=Name etc"
    res.send(req.query);
});


//hanlding post method 
//.name is the object attributes
app.post('/api/courses', (req, res) => {
    //input validation
    //this is using joi
    //create schema for each entity
    const { error } = validateCourse(req.body);


    if (error) return res.status(400).send(error.details[0].message);

    let course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

// for put request 
app.put('/api/courses/:id', (req, res) => {
    // look for course 
    // 404 
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID is not found');
    //validate 
    // 400
    // const result = validateCourse(req.body); this line is not needed because of the line below
    const { error } = validateCourse(req.body); //same as result.error

    if (error) return res.status(400).send(error.details[0].message);
       
    //update
    course.name = req.body.name;
    res.send(course);
});

//delete request
app.delete('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) 
       return res.status(404).send('The course with the given ID is not found');


    const index = courses.indexOf(course);
    courses.splice(index, 1);


    res.send(course);
});




// PORT
//create port 
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}....`);
});


//using joi here for standard validation
function validateCourse(course) {

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);

}