const express = require('express');
const app = express();


app.use(express.static("public")); //for images
app.set('view-engine', 'ejs'); // set to use ejs

let test = [{ "name": "cong" }, { "name": "qiao rov" }, { "name": "dian yi" }]
app.get("/", (req, res) => {
    res.render('index.ejs', { data: test }); //render to page index.ejs and bring name over using <%= name %>

})
app.get("/:query", (req, res) => {
    res.render('index.ejs', { data: { query: req.params.query, test: test } }); //render to page index.ejs and bring name over using <%= name %>

})
//create port 
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}....`);
});