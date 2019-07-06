require("dotenv").config();

//Add the code require to import the keys.js file and store it in a variable
var keys = require("./keys.js");
// var request = require('request'); // PREGUNTAR
var axios = require('axios');
var fs = require('fs');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// variable to capture user input
var userChoice = process.argv[2];
var userParameter = process.argv[3];

//Execute function
UserInputs(userChoice,userParameter);

//Functions: concert-this, spotify-this-song, movie-this, do-what-it-says
//Use the switch statement to select one of many code blocks to be executed: the value of expression is compared and if there is a match, the code is executed.

function UserInputs (userChoice, userParameter){
    switch (userChoice){
        case 'concert-this':
        DisplayConcertInfo(userParameter);
        break;
        case 'spotify-this-song':
            DisplaySongInfo(userParameter);
        break;
        // case 'movie-this':
        // DisplayMovieInfo(userParameter);
        // break;
        // case 'do -what - it - says':
        // DisplayAnyInfo();
        // break;
        default:
            console.log("Invalid option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
    }
}

// 1. Function for concert-this to display concert info: Bands in town (name of Venue, location and date)
function DisplayConcertInfo(userParameter){
    var bandsUrl = "https://rest.bandsintown.com/artists/" + userParameter + "/events?app_id=codingbootcamp"; //IS IT userParameter or artist??
    axios.get(bandsUrl) 
    .then(function (response){
        var result = "";
        if (response.data.length>0){
            for (i = 0; i < response.data.length; i++){
                var venueName = `venue: ${response.data[i].venue.name}\n`
                var venuelocation = `location: ${response.data[i].venue.city}\n`
                var venuedate = `date: ${response.data[i].datetime}\n`
                var divider = `--------------------------------------------------------------\n`
                result += venueName + venuelocation + venuedate + divider
            }
            console.log(result);


            fs.appendFile("log.txt", result, function (err) {
                if (err) throw err;});
            

        } else {
            console.log("No concert found, find another artist")
        };

    })
    .catch(function(err){
        console.log(err)
    });
}
// 2. Function to display information on the song

function DisplaySongInfo(userParameter) {
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });
                
    spotify.request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
  .then(function(data) {
                    console.log(data.album.artists[0].name);
                })
  .catch(function(err) {
                    console.error('Error occurred: ' + err); 
  });
              }
              
