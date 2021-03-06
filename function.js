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

if (hours > 17 && hours < 20) {
  document.write('<body style="background-color: #a3c1da">');
} else if (hours > 21 || hours < 5) {
  document.write('<body style="background-color: #616D7E;">');
} else if (hours > 6 && hours < 9) {
  document.write('<body style="background-color: skyblue">');
} else {
  document.write('<body style="background-color: #c8dae9">');
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  
        <div class="col-sm-2">
          <div class="card-group">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${formatDay(
                  forecastDay.dt
                )}<br /><span class="max-temp">${Math.round(
          forecastDay.temp.max
        )}</span>°   <span class="min-temp">${Math.round(
          forecastDay.temp.min
        )}</span>°<br /><span class="card-description">${
          forecastDay.weather[0].description
        }</span></h5>
                <img
                  src="https://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="48"
                />
                <p class="card-text">
                  Humididty: <span class="card-humidity">${
                    forecastDay.humidity
                  }%<br/>
                  Wind: 
                  <span class="wind-speed">${forecastDay.wind_speed}</span> m/s
                 
                </p>
                </div>
              </div>
            </div>
          </div>
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "ebef9ca4a8de66ed586fac628fade056";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showCurrentWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  celsiusTemperature = response.data.main.temp;
  let h2 = document.querySelector("#temperature");
  h2.innerHTML = `${temperature}`;
  let newLocation = document.querySelector(".newCity");
  newLocation.innerHTML = response.data.name;
  let weather = document.querySelector("h3.description");
  let description = response.data.weather[0].description;
  weather.innerHTML = `${description}`;
  let humidityElement = document.querySelector(".humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector(".wind");
  windElement.innerHTML = response.data.wind.speed;
  let iconElement = document.querySelector(".icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
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
  celsiusTemperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("#temperature");
  h2.innerHTML = `${temperature}`;
  let newLocation = document.querySelector(".newCity");
  newLocation.innerHTML = response.data.name;
  let weather = document.querySelector("h3.description");
  let description = response.data.weather[0].description;
  weather.innerHTML = `${description}`;
  let humidityElement = document.querySelector(".humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector(".wind");
  windElement.innerHTML = response.data.wind.speed;
  let iconElement = document.querySelector(".icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function defaultCity(city) {
  let apiKey = "ebef9ca4a8de66ed586fac628fade056";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
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

let newTemp = document.querySelector("#temperature");
newTemp.addEventListener("click", showWeather);

function clickFahrenheitTemperature(event) {
  event.preventDefault();
  celciusLink.classList.remove("active");
  farhenheitLink.classList.add("active");
  let showFahrenheit = Math.round((celsiusTemperature * 9) / 5 + 32);
  let temperatureItem = document.querySelector("#temperature");
  temperatureItem.innerHTML = showFahrenheit;
}

function clickTemperature(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  farhenheitLink.classList.remove("active");

  let temperatureItem = document.querySelector("#temperature");
  temperatureItem.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let form = document.querySelector(".searchForm");
form.addEventListener("submit", showCity);

let farhenheitLink = document.querySelector("#link-Farhenheit");
farhenheitLink.addEventListener("click", clickFahrenheitTemperature);

let celciusLink = document.querySelector("#link-Celsius");
celciusLink.addEventListener("click", clickTemperature);

defaultCity("Madrid");

displayForecast(response);
