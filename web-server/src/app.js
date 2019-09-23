const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Setup app paths
const publicDirectory = path.join(__dirname, "../public");
const viewsDirectoryPath = path.join(__dirname, "../templates/views");
const viewsPartialsPath = path.join(__dirname, "../templates/partials");

const app = express();
const port = process.env.PORT || 3000;

// Setup hbs configuration
app.set("view engine", "hbs");
app.set("views", viewsDirectoryPath);
hbs.registerPartials(viewsPartialsPath);

// Setup static directory
app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home page",
    author: "Yaroslav Mishchenko"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    author: "Yaroslav Mishchenko"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    author: "Yaroslav Mishchenko",
    message: "You can find answers to your questions on this page!"
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found.",
    author: "Yaroslav Mishchenko"
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must provide an address term!"
    });
  }

  geocode(address, (error, data) => {
    if (error) {
      return res.send({
        error
      });
    }

    const { latitude, longitude, location } = data;

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        });
      }

      return res.send({
        address: req.query.address,
        forecast: `${forecastData.daily.data[0].summary} It is currently ${
          forecastData.currently.temperature
        } degrees out. There is a ${forecastData.currently.precipProbability *
          100}% chance of rain. Min temperature today is - ${
          forecastData.daily.data[0].temperatureMin
        } degrees. Max temperature today is - ${
          forecastData.daily.data[0].temperatureMax
        } degrees.`,
        location
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found.",
    author: "Yaroslav Mishchenko"
  });
});

app.listen(port, () => {
  console.log(`app run on the ${port} port.`);
});
