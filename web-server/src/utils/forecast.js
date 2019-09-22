const request = require("request");

const forecast = (ltd, lng, callback) => {
  const url = `https://api.darksky.net/forecast/0c84687fc72774634c2a58a7c811507d/${ltd},${lng}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the weather service.", undefined);
    } else if (body.error) {
      callback("Unable to find this location. Try another search.", undefined);
    } else {
      callback(undefined, body);
    }
  });
};

module.exports = forecast;
