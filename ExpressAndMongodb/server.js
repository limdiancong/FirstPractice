require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

// database connection 
//start
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => {
    console.error(error);

})
db.on('open', () => {
    console.log("Connected to Database ");
})
// database connection 
//end 

app.use(express.json())
// allow apps to pass json format

const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
