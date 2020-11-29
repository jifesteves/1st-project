let now = new Date();
let today = document.querySelector("#today");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thrusday",
  "Friday",
  "Saturday"
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
let time = `${hours}:${minutes}`;

today.innerHTML = `${day} ${time}`;

function showWeather (response) {
let city = document.querySelector("#city")
city.innerHTML = response.data.name;
let temperature = document.querySelector("#temperature");

celsiusTemperature = response.data.main.temp;

temperature.innerHTML = Math.round (celsiusTemperature);

let description = document.querySelector ("#description");
description.innerHTML = response.data.weather[0].main;
let humidity = document.querySelector ("#humidity");
humidity.innerHTML = response.data.main.humidity;
let wind = document.querySelector("#wind");
wind.innerHTML = Math.round(response.data.wind.speed);
let icon = document.querySelector ("#temp-icon");
icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function displayForecast(response) {
let forecastElement = document.querySelector("#forecast");
 forecast = response.data.list[0];
 
 forecastElement.innerHTML = `
  <div class="col-2">
          <h4>
          12:00
          </h4>
         <img 
         src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" 
         />
         <div class="forecast-temp">
         <strong>${Math.round(forecast.main.temp_max)}°</strong>
         ${Math.round(forecast.main.temp_min)}
          </div>`;

forecast = response.data.list[1];
forecastElement.innerHTML = forecastElement.innerHTML + `
  <div class="col-2">
          <h4>
          15:00
          </h4>
         <img 
         src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" 
         />
         <div class="forecast-temp">
         <strong>${Math.round(forecast.main.temp_max)}°</strong>
         ${Math.round(forecast.main.temp_min)}
          </div>`;

forecast = response.data.list[2];
forecastElement.innerHTML = forecastElement.innerHTML + `
  <div class="col-2">
          <h4>
          18:00
          </h4>
         <img 
         src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" 
         />
         <div class="forecast-temp">
         <strong>${Math.round(forecast.main.temp_max)}°</strong>
         ${Math.round(forecast.main.temp_min)}
          </div>`;

forecast = response.data.list[3];
forecastElement.innerHTML = forecastElement.innerHTML + `
  <div class="col-2">
          <h4>
          21:00
          </h4>
         <img 
         src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" 
         />
         <div class="forecast-temp">
         <strong>${Math.round(forecast.main.temp_max)}°</strong>
         ${Math.round(forecast.main.temp_min)}
          </div>`;

forecast = response.data.list[4];
forecastElement.innerHTML = forecastElement.innerHTML + `
  <div class="col-2">
          <h4>
          00:00
          </h4>
         <img 
         src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" 
         />
         <div class="forecast-temp">
         <strong>${Math.round(forecast.main.temp_max)}°</strong>
         ${Math.round(forecast.main.temp_min)}
          </div>`;
}

function search(city) {
   let apiKey = "04401a5e5263f12ae9fb23f6e2f1ed77";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(showWeather);

  url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayForecast);
}

function typeCity (event) {
  event.preventDefault();
 let city = document.querySelector("#city-input");
  search(city.value)
}

function searchLocation (position) {
  let apiKey = "04401a5e5263f12ae9fb23f6e2f1ed77";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    axios.get(url).then(showWeather);

}

function showCurrentLoc(event) {
  event.preventDefault()
  navigator.geolocation.getCurrentPosition(searchLocation)
  }

function fahreneitTemp(event) {
  event.preventDefault();
  let fahreneit = document.querySelector("#temperature");
  fahreneit.innerHTML = Math.round((celsiusTemperature * 9)/ 5 + 32);
}

function celsiusTemp(event) {
  event.preventDefault();
  let celsius = document.querySelector("#temperature");
   celsius.innerHTML = Math.round(celsiusTemperature);   
}


celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let currentLocation = document.querySelector ("#current-loc");
currentLocation.addEventListener ("click", showCurrentLoc);

let todayTempFahreneit = document.querySelector("#fahreneit");
todayTempFahreneit.addEventListener("click", fahreneitTemp);

let todayTempCelsius = document.querySelector("#celsius");
todayTempCelsius.addEventListener("click", celsiusTemp);


search("Porto");