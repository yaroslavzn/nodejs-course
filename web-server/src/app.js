const path = require("path");
const express = require("express");

// Setup app paths
const publicDirectory = path.join(__dirname, "../public");
const viewsDirectoryPath = path.join(__dirname, "../views");

const app = express();

// Setup hbs configuration
app.set("view engine", "hbs");
app.set("views", viewsDirectoryPath);

// Setup static directory
app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home page from app.js",
    author: "Yaroslav Mishchenko"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    author: "Yaroslav Mishchenko"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "You can find answers to your questions on this page!"
  });
});

app.get("/weather", (req, res) => {
  res.send({
    location: "Poltava",
    forecast: "12 degree"
  });
});

app.listen(3000, () => {
  console.log("app run on the 3000 port.");
});
