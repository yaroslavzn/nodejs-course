const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const {generateMessage, generateLocationMessage} = require("./utils/message");

const app = express();
const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, "../public");

const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(publicDir));

app.get("/", (req, res) => {
    res.send("Chat app");
});

io.on("connection", (socket) => {
    socket.emit("message", generateMessage("Welcome!"));

    socket.broadcast.emit("message", generateMessage("New user enter to the chat room!"));

    socket.on("sendMessage", (message, callback) => {
        io.emit("message", generateMessage(message));
        callback();
    });

    socket.on("disconnect", () => {
        io.emit("message", generateMessage("User has left the chat room!"));
    });

    socket.on("sendLocation", (data, callback) => {
        socket.emit("locationMessage", generateLocationMessage(`https://google.com/maps?q=${data.lat},${data.long}`));
        callback("Location shared!");
    });

});

server.listen(port, () => {
    console.log("Server has been started on the port " + port);
});
