// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
var exphbs = require("express-handlebars");
var flash = require('express-flash');
var bcrypt = require('bcrypt');
var passport = require('passport');
var methodOverride = require('method-override');

const initializePassport = require('./passport-config');
// Two things are passed to initializePassport: 
initializePassport(
    // This is the passport that is being configured 
    passport, 
    // This is the function to find the user based on the email
    email => {return users.find(user => user.email === email)},
    id => {return users.find(user => user.id === id)}
);

// This is not required with a DB (so Val and Nick need to implement DB)
let users = []

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// We need to use sessions to keep track of our user's login status
app.use(session({ 
  secret: "keyboard cat", 
  resave: true, 
  saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())
app.use(methodOverride('_method'));
// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);


// NICK ADDED EVERYTHING BELOW TO THE COMMENT THAT DECLARES OTHERWISE


app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('logIn')
  console.log("hello")
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/hello',
  failureRedirect: '/login',
  // This line allows the failure message that is set as the third parameter 
  // for any failed done() function in passport-config
  failureFlash: true
}));

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('SignUp');
});


app.post('/register', checkNotAuthenticated, async (req, res) => {
  try{
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      // This is not required with DB
      users.push({
          // This ID is automatically generated with a DB 
          id: Date.now().toString(),
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword
      })
      res.redirect('/login');
  } catch{
      res.redirect('/register')
  }
  console.log(users)
});


// TO TEAM FROM NICK: 
// this incorporates method-override. I am not sure how we want
// to incorporate the logout button/function, mostly because 
// I know little about our site at the moment 
app.delete('/logout', (req, res) =>{
  // logOut set up by passport
  req.logOut();
  res.redirect('/login');
});

function checkAuthenticated(req, res, next){
  // isAuthenticated set up by passport
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect('/login')
}

function checkNotAuthenticated (req, res, next){
  if(req.isAuthenticated()){
    // we can change this to redirect wherever we want:
    // all it does it stop people who are signed up from returning to 
    // login or register page (until they log out)
      return res.redirect('/hello')
  }
  next()
}

// END OF NICK'S ADDITION
//try syncOptions.force = true if force = true doesn't work -A.L.
// Syncing our database and logging a message to the user upon success
db.sequelize.sync(force = true).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
