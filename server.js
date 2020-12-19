// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
// Requiring passport as we've configured it
const exphbs = require("express-handlebars");
const passport = require("./config/passport");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
var icecream = {
  
}

// Syncing our database and logging a message to the user upon success
// // handlebars 
// ********

// Data
var icecreams = [
  { name: "vanilla", price: 10, awesomeness: 3 },
  { name: "chocolate", price: 4, awesomeness: 8 },
  { name: "banana", price: 1, awesomeness: 1 },
  { name: "green tea", price: 5, awesomeness: 7 },
  { name: "jawbreakers", price: 6, awesomeness: 2 },
  { name: "pistachio", price: 11, awesomeness: 15 }
];

// Routes
app.get("/icecreams/:name", function(req, res) {

  let foundIcecream = icecreams.filter(icecream => icecream.name === req.params.name)
  res.render("icecream", foundIcecream[0])
  // for (var i = 0; i < icecreams.length; i++) {
  //   if (icecreams[i].name === req.params.name) {
  //     return res.render("icecream", icecreams[i]);
  //   }
  // }
});

app.get("/icecreams", function(req, res) {
  res.render("index", { ics: icecreams });
});




// // handlebars 
// *****


db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
