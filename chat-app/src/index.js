const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

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
    socket.emit("message", "Welcome!");

    socket.broadcast.emit("message", "New user enter to the chat room!");

    socket.on("sendMessage", (message) => {
        io.emit("message", message);
    });

    socket.on("disconnect", () => {
        io.emit("message", "User has left the chat room!");
    });

    socket.on("sendLocation", (data) => {
        socket.broadcast.emit("message", `https://google.com/maps?q=${data.lat},${data.long}`);
    });

});

server.listen(port, () => {
    console.log("Server has been started on the port " + port);
});
