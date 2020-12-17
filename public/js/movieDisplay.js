variables
//var movies = [];

/////////////////////////////////////////////////////////////////////////////////////////////
//operation
$("#search-button").on("click", function (event) {
  event.preventDefault();
  console.log("button clicked");
  //grab text from input box
  var searchTitle = $("#search-title").val().trim();

  // construct URL
  var queryURL = "/api/movie_search/" + searchTitle;

  //Ajax call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
   // appendMovie(response);
    

  });


});

// function appendMovie(response) {
//   //stock info
//   console.log("pasting STOCK", response);
//   $("#movieInfo").empty();
//   $("#movieInfo").append("<h3><b>" + response.Title + "</b></h3>");
//   $("#movieInfo").append("<h6><b>Rated: </b>" + response.Rated + "</h6>");
//   $("#movieInfo").append("<h6><b>Released Year: </b>" + response.Released + "</h6>");
//   $("#movieInfo").append("<h6><b>Runtime: </b>" + response.Runtime + "</h6>");
//   $("#movieInfo").append("<h6><b>Genre: </b>" + response.Genre + "</h6>");
//   $("#movieInfo").append("<h6><b>Director: </b>" + response.Director + "</h6>");
//   $("#movieInfo").append("<h6><b>Writer: </b>" + response.Writer + "</h6>");
//   $("#movieInfo").append("<h6><b>Language: </b>" + response.Language + "</h6>");
//   $("#movieInfo").append("<h6><b>Awards: </b>" + response.Awards + "</h6>");
//   $("#movieInfo").append("<h6><b>Ratings: </b>" +response.Ratings[1].Source+"-" +response.Ratings[1].Value+ "</h6>");
  
// }

