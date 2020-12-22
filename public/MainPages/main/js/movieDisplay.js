//var movies = [];

/////////////////////////////////////////////////////////////////////////////////////////////
//operation
$("#search-button").on("click", function (event) {
  event.preventDefault();
  // var url = $(this).data('target');
  // location.replace(url);
  $("#container1").attr("style", "display: none;");
  $("#hidden").attr("style", "display: ;");
  console.log("button clicked");
  //grab text from input box
  var searchTitle = $("#search-title").val().trim();
  console.log(searchTitle);
  // construct URL
  var queryURL = "/api/movie_search/" + searchTitle;
  console.log(queryURL);
  //Ajax call
  $.ajax({
    method: "GET",
    url: queryURL,
  }).then(function (response) {
    console.log(response);
    appendMovie(response);
  });
});

function appendMovie(response) {
  $("#movieInfo").empty();

  $("#movieInfo").append(
    "<h2 style='color:blue' ><b>" + response.Title + "</b></h2>"
  );
  $("#movieInfo").append("<h6><b>Rated: </b>" + response.Rated + "</h6>");
  $("#movieInfo").append(
    "<h6><b>Released Year: </b>" + response.Released + "</h6>"
  );
  $("#movieInfo").append("<h6><b>Runtime: </b>" + response.Runtime + "</h6>");
  $("#movieInfo").append("<h6><b>Genre: </b>" + response.Genre + "</h6>");
  $("#movieInfo").append("<h6><b>Director: </b>" + response.Director + "</h6>");
  $("#moviePic").append("<img src='" + response.Poster + "'>");
  $("#movieInfo").append("<h6><b>Writer: </b>" + response.Writer + "</h6>");
  $("#movieInfo").append(
    "<h6><b>Released Year: </b>" + response.Actors + "</h6>"
  );
  $("#movieInfo").append(
    "<h6><b>Released Year: </b>" + response.Plot + "</h6>"
  );
  $("#movieInfo").append("<h6><b>Language: </b>" + response.Language + "</h6>");
  $("#movieInfo").append("<h6><b>Awards: </b>" + response.Awards + "</h6>");
  $("#imdbRate").append(response.imdbRating);
  $("#imdVotes").append(response.imdbVotes);
}
