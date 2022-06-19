let now = new Date();
let h3 = document.querySelector("#nowDate");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h3.innerHTML = `${day} ${hours}:${minutes}`;

function showCurrentWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("#temperature");
  h2.innerHTML = `${temperature}`;
  let newLocation = document.querySelector(".newCity");
  newLocation.innerHTML = response.data.name;
  let weather = document.querySelector("h3.description");
  let description = response.data.weather[0].description;
  weather.innerHTML = `${description}`;
}

function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "ebef9ca4a8de66ed586fac628fade056";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}
function showCurrentCity() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}
let currentLocationButton = document.querySelector("#showCurrentLocation");
currentLocationButton.addEventListener("click", showCurrentCity);

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("#temperature");
  h2.innerHTML = `${temperature}`;
  let newLocation = document.querySelector(".newCity");
  newLocation.innerHTML = response.data.name;
  let weather = document.querySelector("h3.description");
  let description = response.data.weather[0].description;
  weather.innerHTML = `${description}`;
}
function showCity(event) {
  event.preventDefault();
  let searchEngine = document.querySelector(".engine");
  let city = document.querySelector(".newCity");
  city.innerHTML = `${searchEngine.value}`;

  let apiKey = "ebef9ca4a8de66ed586fac628fade056";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchEngine.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
let form = document.querySelector(".searchForm");
form.addEventListener("submit", showCity);

let newTemp = document.querySelector("#temperature");
newTemp.addEventListener("click", showWeather);
