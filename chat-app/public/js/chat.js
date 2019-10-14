const socket = io();
const form = document.querySelector("#chat-form");
const messageBlock = document.querySelector("#chat-message");
const locationBtn = document.querySelector("#location-btn");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const message = messageBlock.value;

    socket.emit("sendMessage", message);
});

locationBtn.addEventListener("click", () => {
    if (!navigator.geolocation) {
        return alert("Your browser doesn't support Geolocation.");
    }

    navigator.geolocation.getCurrentPosition((pos) => {
        const data = {
            lat: pos.coords.latitude,
            long: pos.coords.longitude
        };
        socket.emit("sendLocation", data);
    });
});

socket.on("message", (data) => {
    console.log(data);
});