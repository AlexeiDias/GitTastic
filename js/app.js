//this array will hold the gif samples        
var gifs = ["surf", "dance", "music", "camping"];

//  function that will make an Ajax call to a url, get response, create a p tag for the rating and giv data-state attr.
function alertGifName() {

//  gifName will hold data-name attr
var gifName = $(this).attr("data-name");

//  create var to hold the url
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=wslWpWhssAgYDK6zVXacBDsacT47flr4&limit=10&q=" + gifName;

// Ajax call to url
$.ajax({
url: queryURL,
method: "GET"
})

//function that takes response from the ajax call
.then(function(response) {
  console.log(response);
  var results = response.data

for (i =0; i < results.length; i++) {
  
// create a variable and takes a div
var gifDiv = $("<div>");

// create a variable p takes a p tag with rating result
var p = $("<p>").text("Rating:" + results[i].rating);

// create variable that takes a image tag 
var gifImage = $("<img>");

// give attr and classes to gifImage variable
gifImage.attr("src", results[i].images.fixed_height_still.url);
gifImage.attr("data-still", results[i].images.fixed_height_still.url);
gifImage.attr("data-animate", results[i].images.fixed_height.url);
gifImage.attr("data-state", "still");
gifImage.addClass("gifState");

// append variable p to gifDiv
gifDiv.append(p);
  
// append new gifImage to gifDiv
gifDiv.append(gifImage);

// add gifDiv to gif area
$("#gifs-appear-here").prepend(gifDiv);
} 
// function tha makes gif move and stop
$(".gifState").on("click", function() {
    console.log("you clicked a gif");
    var state = $(this).attr("data-state");
    console.log(this);
    if (state === "still") {
      var animate = $(this).attr("data-animate");
      $(this).attr("src", animate);
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
              
});
}

// function that takes a new gif name and make a new button
function renderButtons() {
$("#buttons-view").empty();
$("#gif-input").val("");
for (var i = 0; i < gifs.length; i++) {
  var newButton = $("<button>");
  newButton.addClass("gif");
  newButton.attr("data-name", gifs[i]);
  newButton.text(gifs[i]);
  $("#buttons-view").append(newButton);
}
}

$("#add-gif").on("click", function(event) {
event.preventDefault();
var gify = $("#gif-input").val().trim();
gifs.push(gify);
renderButtons();
});

renderButtons();
$(document).on("click", ".gif", alertGifName) 
