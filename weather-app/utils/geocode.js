const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoieWFyb3NsYXZ6biIsImEiOiJjazBxeng3cWIwMTJhM2VvOWM5YXB6eXo5In0.xinAg1pbtKELSxhRtVKG0A`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the service!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find this location. Try another search.", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
