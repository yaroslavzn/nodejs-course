const socket = io();
const form = document.querySelector("#chat-form");
const messageBlock = form.querySelector("#chat-message");
const sendMessageButton = form.querySelector("#send-message");
const locationBtn = document.querySelector("#location-btn");
const messageTemplate = document.querySelector("#message-template");
const locationMessageTemplate = document.querySelector("#location-message-template");
const sidebarContentTemplate = document.querySelector("#sidebar-template");
const messages = document.querySelector("#messages");

const loginInfo = Qs.parse(location.search, {ignoreQueryPrefix: true});

const autoscroll = () => {
    const newMessage = messages.lastElementChild;

    const newMessageStyles = getComputedStyle(newMessage);
    const newMessageMargin = parseInt(newMessageStyles.marginBottom);
    const newMessageHeight = newMessage.offsetHeight + newMessageMargin;

    const visibleHeight = messages.offsetHeight;

    const containerHeight = messages.scrollHeight;

    const scrollOffset = messages.scrollTop + visibleHeight;

    if (containerHeight - newMessageHeight <= scrollOffset) {
        messages.scrollTop = messages.scrollHeight
    }
};

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
        username: data.username,
        message: data.text,
        createdAt: moment(data.createdAt).format("kk:mm:ss")
    });

    messages.insertAdjacentHTML("beforeend", markup);
    autoscroll();
});

socket.on("locationMessage", (data) => {
    const markup = Mustache.render(locationMessageTemplate.innerHTML, {
        username: data.username,
        url: data.url,
        createdAt: moment(data.createdAt).format("kk:mm:ss")
    });

    messages.insertAdjacentHTML("beforeend", markup);
    autoscroll();
});

socket.on("roomData", (data) => {
    const markup = Mustache.render(sidebarContentTemplate.innerHTML, {
        room: data.room,
        users: data.users
    });

    document.querySelector("#sidebar").innerHTML = markup;
});

socket.emit("join", loginInfo, (error) => {
    if (error) {
        alert(error);
        return location.href = '/';
    }
});