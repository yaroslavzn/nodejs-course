const request = require("request");

const url =
  "https://api.darksky.net/forecast/0c84687fc72774634c2a58a7c811507d/37.8267,-122.4233";

request({ url: url }, (error, response) => {
  const data = JSON.parse(response.body);

  console.log(data.currently);
});
