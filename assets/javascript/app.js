$(document).ready(function(){
    
   
    //the array of cars
    function cars(){
 topics = ["dodge challenger", "ford mustang", "dodge viper", "chevrolet camaro", "ford gt", "chevrolet corvette", "dodge charger", "chevrolet chevelle"];
for (var i = 0; i < topics.length; i++) {
        
    //makes a button tag for all of the items in the array
      var btn = $("<button>" + topics[i] + "</button>");
  //puts the buttons on the screen
      $(".buttonDiv").append(btn)
      btn.attr("data-car", topics[i])
      btn.attr("class", "btn btn-secondary")
      
  }
}
cars();
  $(".btn").on("click", function(){
var name = $(this).attr("data-car");
var queryURL =  "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=KCgM79ZpxcllM9MB9ntE6v2cO7qMkabl&limit=10"

$.ajax({
url: queryURL,
method: "GET"
})
.then(function(response){
   
    //results is the path to the array for the for loop
    var results = response.data;
    console.log(results)
    
    for (var i = 0; i < results.length; i++) {
        //creates an image tag and stores it
        var carImg = $("<img>")
        //
        var stillGifUrl = results[i].images.fixed_height_still.url;
        var moveGifUrl = results[i].images.fixed_height.url;
          
        var stillGif = carImg.attr("src", stillGifUrl);
    
        //adds data-state to all of the images
        stillGif.attr("data-state", "still")
        //adds a class to all of the images
        stillGif.attr("class", "gif")
        stillGif.attr("data-still", stillGifUrl)
        stillGif.attr("data-move", moveGifUrl)
        $(".gifsHere").append(stillGif);
    }
    
$(".gif").on("click", function(){
    var state = $(this).attr("data-state");
    
    console.log(this)
    if (state === "still") {
        $(this).attr("data-state", "move")
    var playGif = $(this).attr("data-move");
    $(this).attr("src", playGif);
    
    }
    else if(state === "move"){
        $(this).attr("data-state", "still")
        var pauseGif = $(this).attr("data-still");
        $(this).attr("src", pauseGif);
    }
});
    console.log(name)
});

});

$("#search").on("click", function(){
    $(".buttonDiv").empty();
    var newGif = $("newGif").val();
    topics.push(newGif)
    cars();
    console.log(newGif)
});

});