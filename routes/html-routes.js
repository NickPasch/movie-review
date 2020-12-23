// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/movie_search");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/movie_search");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get("/members", isAuthenticated, function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/signup.html"));
  // });

  app.get("/movie_search", function(req, res) {
    res.render(path.join("index"));
  });
  app.post("/discussion", function(req, res) {
    res.render(path.join("discussion"));
  });

  let array =[]

  app.post("/discussion", function(req, res) {
    db.Discussion.create({
      body: req.body.discussion
      }).then(function(){
        res.render("discussion", {discussion: req.body.discussion});
      })
  //         try{
  //     array.push({
  //       discussion: req.body.discussion
  //     })
  //   }catch(e){
  //     return e
  //   }
  //   console.log(array)
  //   console.log()
    // res.render("discussion");
  });




    // try{
    //   array.push({
    //     discussion: req.body.discussion
    //   })
    // }catch(e){
    //   return e
    // }
    // console.log(array)
    // console.log()
    // res.render(path.join("discussion"));

};