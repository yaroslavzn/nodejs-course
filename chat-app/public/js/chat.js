const socket = io();
const form = document.querySelector("#chat-form");
const messageBlock = form.querySelector("#chat-message");
const sendMessageButton = form.querySelector("#send-message");
const locationBtn = document.querySelector("#location-btn");
const messageTemplate = document.querySelector("#message-template");
const messages = document.querySelector("#messages");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendMessageButton.setAttribute("disabled", "disabled");

    const message = messageBlock.value;

    socket.emit("sendMessage", message, () => {
        sendMessageButton.removeAttribute("disabled");
        messageBlock.value = "";
        messageBlock.focus();
    });
});

locationBtn.addEventListener("click", () => {
    if (!navigator.geolocation) {
        return alert("Your browser doesn't support Geolocation.");
    }

    locationBtn.setAttribute("disabled", "disabled");

    navigator.geolocation.getCurrentPosition((pos) => {
        const data = {
            lat: pos.coords.latitude,
            long: pos.coords.longitude
        };
        socket.emit("sendLocation", data, (message) => {
            console.log(message);
            locationBtn.removeAttribute("disabled");
        });
    });
});

socket.on("message", (data) => {
    const markup = Mustache.render(messageTemplate.innerHTML, {
        message: data
    });

    messages.insertAdjacentHTML("beforeend", markup);
});