// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var axios = require("axios");
require('dotenv').config();

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get("/api/movie_search/:search", function (req, res) {
    console.log(req.params.search)
    const searchMovie = req.params.search;
  
      axios.get("http://www.omdbapi.com/?t=" + searchMovie + "&apikey=" + process.env.api_key).then(movieData => {
        console.log(movieData);
        const data = { hello: "hello" };
        //res.json(data);
         res.json(movieData.data);
      }).catch(err => console.log(err))
  });

  app.get("/api/movie_search", function (req, res) {
    var options = {
      method: 'GET',
      url: 'https://movies-tvshows-data-imdb.p.rapidapi.com/',
      params: {type: 'get-boxoffice-movies', page: '1'},
      headers: {
        'x-rapidapi-key': '265b25ed9fmsh520fa44669f7ec7p1ec568jsn96a8204d2624',
        'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  
  })


  var axios = require("axios").default;


};


