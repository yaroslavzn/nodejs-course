const https = require("https");

const url =
  "https://api.darksky.net/forecast/0c84687fc72774634c2a58a7c811507d/45,39?units=si";

const request = https.request(url, response => {
  let data = "";
  response.on("data", dataBuffer => {
    data += dataBuffer.toString();
  });

  response.on("end", () => {
    data = JSON.parse(data);
    console.log(data);
  });
});

request.on("error", error => {
  console.log(error);
});

request.end();
