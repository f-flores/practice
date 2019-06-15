var axios = require("axios");
var moment = require("moment");

var command = process.argv[2];
var value = process.argv.slice(3);

function concertThis(band) {
  var bandsInTownURL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";
  console.log(bandsInTownURL);

  axios
  .get(bandsInTownURL)
  .then(function(response) {
    var concerts = response.data;
    for (concert of concerts) {
      console.log(concert.venue.name);
      console.log(concert.venue.city);
      console.log(moment(concert.datetime).format('MM/DD/YYYY'));
      console.log("=========================");
    }
    if (concerts.length === 0) {
      console.log("No upcoming " + band + " concerts. Check again soon");
    }
  })
  .catch(function(err) {
    console.log("Either band does not exist or no upcoming concerts for " + band + ". Try another one.");
  })
}

function doLiri() {
  switch(command) {
    case 'concert-this':
      var band;
      if (value.length > 0) {
        band = value.join("+");
        console.log(band);
      } else {
        band = "Ariana+Grande"; // default band
      }
      concertThis(band);
      break;
    default:
      console.log("...unexpected command. Valid commands are ...");
      break;
  }
}

doLiri();
