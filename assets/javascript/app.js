$(document).ready(function () {
    //the array of cars
    topics = ["dodge challenger", "ford mustang", "dodge viper", "chevrolet camaro", "ford gt", "chevrolet corvette", "dodge charger", "chevrolet chevelle", "Porsche Cayman GTS", "BMW i8 Coupe", "Audi R8", "mclaren 720s", "lamborghini aventador", "ferrari 458", "porsche 918 spyder"];
    //the function to display the buttons
    function cars() {
        //clears all of the buttons for the new ones
        $(".buttonDiv").empty();
        //loops through the topics array
        for (var i = 0; i < topics.length; i++) {

            //makes a button tag for all of the items in the array
            var btn = $("<button>" + topics[i] + "</button>");
            //puts the buttons on the screen
            $(".buttonDiv").append(btn)
            //gives all of the buttons a data-car of the name in the array
            btn.attr("data-car", topics[i])
            //gives all of the buttons a class
            btn.attr("class", "btn btn-secondary")

        }
    }
    cars();
    //the function to show the gifs
    function gifRender() {
        //when a button is clicked store the data-car in a variable
        var name = $(this).attr("data-car");
        //use the name variable in the url
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=KCgM79ZpxcllM9MB9ntE6v2cO7qMkabl&limit=10"
        //the ajax function
        $.ajax({
                //the url variable from above
                url: queryURL,
                method: "GET"
            })
            //the code inside the then function runs the ajax response comes back
            .then(function (response) {
                console.log(response);
                //results is the path to the array for the for loop
                var results = response.data;
                //the loop for the array     
                for (var i = 0; i < results.length; i++) {
                    //creates an image tag and stores it
                    var carImg = $("<img>")
                    //stores the path to each still image in a variable
                    var stillGifUrl = results[i].images.fixed_height_still.url;
                    //stores the path to each moving image in a variable
                    var moveGifUrl = results[i].images.fixed_height.url;
                    //givers the img tag a src of the still image 
                    var stillGif = carImg.attr("src", stillGifUrl);
                    //the rating
                    var rating = $("<p>").text(results[i].rating);
                    //adds data-state to all of the images
                    stillGif.attr("data-state", "still")
                    //adds a class to all of the images
                    stillGif.attr("class", "gif")
                    //adds data-still of the still url to all of the images
                    stillGif.attr("data-still", stillGifUrl)
                    //adds data-move of the moving url to all of the images
                    stillGif.attr("data-move", moveGifUrl)
                    //displays the images onto the screen
                    $(".gifsHere").prepend(stillGif);
                   
                }
                //onclick of one of the gifs
                $(".gif").on("click", function (event) {
                    //prevents default
                    event.preventDefault();
                    //stores the data-state in a variable
                    var state = $(this).attr("data-state");
                    //if the data-state is still
                    if (state === "still") {
                        //update the state to move
                        $(this).attr("data-state", "move")
                        //get the data-move and store it in a variable
                        var playGif = $(this).attr("data-move");
                        //update the img tag src to the data-move 
                        $(this).attr("src", playGif);

                    }
                    //else if the data-state is move
                    else if (state === "move") {
                        //update the data-state to still
                        $(this).attr("data-state", "still")
                        //store the data-still of the image in a variable
                        var pauseGif = $(this).attr("data-still");
                        //update the img src with the data-still
                        $(this).attr("src", pauseGif);
                    }
                });

            });

    }
    //when the search gifs button is clicked
    $("#search").on("click", function () {
        //get the input form the input tag
        var newGif = $("#newGif").val();
        //push it into the array
        topics.push(newGif)
        //call the cars function
        cars();
        //clears the input
        $("#newGif").val("");
    });
    //onclick of a button call the gifRender function
    $(document).on("click", ".btn", gifRender);
});