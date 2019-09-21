const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const location = process.argv[2];

if (!location) {
  console.log("Please enter location name.");
} else {
  geocode(location, (error, { latitude, longitude, location }) => {
    if (error) {
      return console.log(error);
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }

      console.log("Location: ", location);
      console.log(
        `${forecastData.daily.data[0].summary} It is currently ${forecastData.currently.temperature} degrees out. There is a ${forecastData.currently.precipProbability}% chance of rain.`
      );
    });
  });
}
