$(document).ready(function () {
    //the array of cars
    topics = ["Dodge Challenger", "Ford Mustang", "Dodge Viper", "Chevrolet Camaro", "Ford Gt", "Chevrolet Corvette", "Dodge Charger", "Chevrolet Chevelle",
        "Porsche Cayman GTS", "BMW i8 Coupe", "Audi R8", "Mclaren 720s", "Lamborghini Aventador", "Ferrari 458", "Porsche 918 Spyder", "Hellcat", "Mclaren F1",
        "Ferrari f40", "Bugatti Chiron", "koenigsegg agera rs"
    ];
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
            //gives all of the buttons a class note the bootstrap classes
            btn.attr("class", " btn-secondary col-md-3")

        }
    }
    cars();
    //the limit for the url
    var limit = 10;
    //onclick change the limit to 5
    $(".limit5").on("click", function () {
        limit = 5;
    });
    //onclick change the limit to 10
    $(".limit10").on("click", function () {
        limit = 10;
    });
    //onclick change the limit to 15
    $(".limit15").on("click", function () {
        limit = 15;
    });
    //the function to show the gifs
    function gifRender() {

        //when a button is clicked store the data-car in a variable
        var name = $(this).attr("data-car");
        //use the name variable in the url
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=KCgM79ZpxcllM9MB9ntE6v2cO7qMkabl&limit=" + limit
        //the ajax function
        $.ajax({
                //the url variable from above
                url: queryURL,
                method: "GET"
            })
            //the code inside the then function runs the ajax response comes back
            .then(function (response) {
                //results is the path to the array for the for loop
                var results = response.data;
                //the loop for the array     
                for (var i = 0; i < results.length; i++) {
                    //the rating
                    var rating = $("<p>")
                    //gives the p tag a class for the bootstrap card
                    rating.attr("class", "card-text")
                    rating.text("rating: " + results[i].rating);

                    //creates a bootstrap card for the gif
                    var card = $("<div>").attr("class", "card")
                    //creates an image tag and stores it
                    var carImg = $("<img>")
                    //adds the image tag to the card
                    card.prepend(carImg)
                    //adds a card body for the rating
                    var cardbody = $("<div>").attr("class", "card-body")
                    //adds the rating to the card
                    cardbody.prepend(rating)
                    //puts it all togther for the final card
                    card.prepend(cardbody)

                    //stores the path to each still image in a variable
                    var stillGifUrl = results[i].images.fixed_height_still.url;
                    //stores the path to each moving image in a variable
                    var moveGifUrl = results[i].images.fixed_height.url;
                    //givers the img tag a src of the still image 
                    var Gif = carImg.attr("src", stillGifUrl);
                    //adds data-state to all of the images
                    Gif.attr("data-state", "still")
                    //adds a class to all of the images
                    Gif.attr("class", "gif")
                    //adds data-still of the still url to all of the images
                    Gif.attr("data-still", stillGifUrl)
                    //adds data-move of the moving url to all of the images
                    Gif.attr("data-move", moveGifUrl);

                    //displays the images onto the screen
                    $(".container").prepend(card);
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
        var newGif = $("#newGif").val().trim();
        //checks to make sure the user enters a value so there is no blank buttons
        if (newGif === "") {
            alert("enter a car")
        } else {
            //push it into the array
            topics.push(newGif)
            //call the cars function
            cars();
            //clears the input
            $("#newGif").val("");
        }
    });
    //onclick of a button call the gifRender function
    $(document).on("click", ".btn-secondary", gifRender);
});