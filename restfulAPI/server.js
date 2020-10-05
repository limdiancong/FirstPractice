require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGO_URI } = require("./config")
const port = process.env.PORT || 3000;
const postRouter = require('./routes/api/posts');

// database connection 
//start
mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => console.log("MongoDB Connected")).catch(err => console.log(err));

// database connection 
//end 
app.use(express.json())
app.get("/", (req, res) => {
    res.send("hello world");
})

app.use('/api/posts', postRouter)

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})
