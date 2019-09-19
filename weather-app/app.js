const request = require("request");

const url =
  "https://api.darksky.net/forecast/0c84687fc72774634c2a58a7c811507d/49.542,34.519?lang=uk&units=si";

request({ url: url, json: true }, (error, response) => {
  const data = response.body;

  console.log(
    `${data.daily.data[0].summary} It is currently ${data.currently.temperature} degrees out. There is a ${data.currently.precipProbability}% chance of rain.`
  );
});

const geocodingUrl =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/Poltava.json?access_token=pk.eyJ1IjoieWFyb3NsYXZ6biIsImEiOiJjazBxeng3cWIwMTJhM2VvOWM5YXB6eXo5In0.xinAg1pbtKELSxhRtVKG0A";

request({ url: geocodingUrl, json: true }, (error, response) => {
  const data = response.body;

  console.log(`Longitude: ${data.features[0].center[0]}`);
  console.log(`Latitude: ${data.features[0].center[1]}`);
});
