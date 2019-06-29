require("dotenv").config();

//Add the code require to import the keys.js file and store it in a variable
var keys = require("./keys.js");


//access the information
var spotify = new Spotify(keys.spotify);


//make it so liri can take one of the the following commands:

var commands = ['concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says'];


