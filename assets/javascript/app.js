$(document).ready(function(){

    //the array of cars
var topics = ["dodge challenger", "ford mustang", "dodge viper", "chevrolet camaro", "ford gt", "chevrolet corvette", "dodge charger", "chevrolet chevelle"];
for (var i = 0; i < topics.length; i++) {
        
    //makes a button tag for all of the items in the array
      var btn = $("<button>" + topics[i] + "</button>");
  //puts the buttons on the screen
      $(".buttonDiv").append(btn)
      btn.attr("data-car", topics[i])
      btn.attr("class", "btn")
      
  }
$(".btn").on("click", function(){
var name = $(this).attr("data-car");
var queryURL =  "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=KCgM79ZpxcllM9MB9ntE6v2cO7qMkabl&limit=10"

$.ajax({
url: queryURL,
method: "GET"
})
.then(function(response){
    
    var results = response.data;
    console.log(results)
    for (var i = 0; i < results.length; i++) {
        var carImg = $("<img>")
        var stillGifUrl = results[i].images.fixed_height_still.url;
        var moveGifUrl = results[i].images.fixed_height.url;
        var stillGif = carImg.attr("src", stillGifUrl);
        
      

        $(".gifsHere").append(stillGif);
    }
    console.log(name)
    $(".gifsHere").append(moveGifUrl);
});

});
});