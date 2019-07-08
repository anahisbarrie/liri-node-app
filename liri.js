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
        case 'movie-this':
        DisplayMovieInfo(userParameter);
        break;
        case 'do-what-it-says':
        DisplayAnyInfo();
        break;
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

            var result = "";
                            // if (data.length > 0) { **PREGUNTAR***
                            //   for (i = 0; i < data.length; i++) { **PREGUNTAR COMO SI NO HAY DATA**
                  var artists = `artists: ${data.album.artists[0].name}\n`
                  var songname = `songname: ${data.name}\n`
                  var spotifylink = `spotifylink: ${data.album.external_urls.spotify}\n`
                  var albumsong = `album: ${data.album.name}\n`
                  var divider = `----------------------------------------------------------\n`
                  result += artists + songname + spotifylink + albumsong
            
                console.log(result);
                fs.appendFile("log.txt", result, function (err) {
                  if (err) throw err;
              });
      })     
  .catch(function(err) {
                    console.error('Error occurred: ' + err); 
        });
}

//3. function to display info aout movies: node liri.js movie-this '<movie name here>'
    function DisplayMovieInfo(userParameter) {
        var movieUrl = "http://www.omdbapi.com/?t=" + userParameter + "&apikey=75970c5c" ; 
        axios.get(movieUrl)
            .then(function (response) {
                // console.log(response.data);    THIS DATA IS ANSWERING PROPERLY
                var result = "";
                if (response.data.length > 0) {
                    for (i = 0; i < response.data.length; i++) {
                        var tittleMovie = `Title: ${response.data.Title}\n`
                        var movieYear = `Year: ${response.data.Year}\n`
                        var IMDBrating = `IMDB rating: ${response.data.imdbRating}\n`
                        var rottenTomatoesRating = `rtomatoes: ${response.data.Ratings[1].Value}\n`
                        var Country = `Country: ${response.data.Country}\n`
                        var Language = `Language: ${response.data.Language}`
                        var Plot = `Plot: ${response.data.Plot}`
                        var Actors = `Actors: ${response.data.Actors}`
                        var divider = `--------------------------------------------------------------\n`
                        result += tittleMovie + movieYear + IMDBrating + rottenTomatoesRating + Country + Language + Plot + Actors 
                        console.log(result);
                    }
                    fs.appendFile("log.txt", result, function (err) {
                        if (err) throw err;
                    });
                } 
                else {
                    console.log("Mr. Nobody =  " + "https://www.imdb.com/title/tt0485947/")
                };
            })
            .catch(function (err) {
                console.log(err)
            });
    }
//4. function to do-what-it-says'


        
    