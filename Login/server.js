if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');

const initializePassport = require('./passport-config');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override')
// using login email to find user called from passport config
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id),

);

app.use(express.urlencoded({ extended: false })) // need to tell system we using post information from form using the name field eg. name= email 
app.use(express.static("public")); //for images
app.set('view-engine', 'ejs'); // set to use ejs
app.use(flash())//to pop login message 
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
})) // name of our secrent key "SESSION_SECRET" create and .env
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
// temporary as we not connecting to database
const users = [];

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name }); //render to page index.ejs and bring name over using <%= name %>

})
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs');

})
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))
app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs');
})
//ensure it return before continue
app.post('/register', checkNotAuthenticated, async (req, res) => {

    //this is ascroymous, need to await and need catch add async above
    try {
        const hasedpassword = await bcrypt.hash(req.body.password, 10);
        //simulate pusing into database
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hasedpassword
        })
        res.redirect('/login');
    } catch{
        res.redirect('/register');
    }
    console.log(users);
})

app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')

})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login');

}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }

    next()
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}....`);
});