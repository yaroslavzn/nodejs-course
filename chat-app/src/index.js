const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));

app.get('/', (req, res) => {
   res.send("Chat app");
});

app.listen(port, () => {
    console.log("Server has been started on the port " + port);
});
