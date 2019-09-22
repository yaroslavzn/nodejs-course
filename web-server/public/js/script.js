const form = document.getElementById("search-form");
const searchInput = form.querySelector("input[name=address]");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");

form.addEventListener("submit", e => {
  e.preventDefault();

  const value = searchInput.value;

  messageOne.textContent = "";
  messageTwo.textContent = "";

  messageOne.textContent = "We are fetching weather info for you ;)";
  fetch(`/weather?address=${value}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        return (messageOne.textContent = data.error);
      }

      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
    });
});
