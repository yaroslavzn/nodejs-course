const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log("Server is running on the port " + process.env.PORT);
});
