const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const {generateMessage, generateLocationMessage} = require("./utils/message");
const {addUser, removeUser, getUser, getUsersInRoom} = require("./utils/users");

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
    socket.on("join", ({room, username}, callback) => {
        const {error, user} = addUser({
           id: socket.id,
           username,
           room
        });

        if (error) {
            return callback(error);
        }

        socket.join(user.room);

        socket.emit("message", generateMessage("Admin", "Welcome!"));
        io.to(user.room).emit("roomData", {
           room: user.room,
           users: getUsersInRoom(user.room)
        });

        socket.broadcast.to(user.room).emit("message", generateMessage("Admin", `${user.name} has joined!`));
    });

    socket.on("sendMessage", (message, callback) => {
        const {user, error} = getUser(socket.id);

        if (error) {
            return callback(error);
        }

        io.to(user.room).emit("message", generateMessage(user.name, message));
        callback();
    });

    socket.on("disconnect", () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit("message", generateMessage("Admin", `${user.name} has left the chat room!`));
            io.to(user.room).emit("roomData", {
                room: user.room,
                users: getUsersInRoom(user.room)
            });
        }
    });

    socket.on("sendLocation", (data, callback) => {
        const {user, error} = getUser(socket.id);

        if (error) {
            return callback(error);
        }
        socket.to(user.room).emit("locationMessage", generateLocationMessage(user.name,`https://google.com/maps?q=${data.lat},${data.long}`));
        callback("Location shared!");
    });
});

server.listen(port, () => {
    console.log("Server has been started on the port " + port);
});
