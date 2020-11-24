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
let temperature = document.querySelector("#temperature")
temperature.innerHTML = Math.round (response.data.main.temp);
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


function typeCity(event) {
  event.preventDefault();

  let apiKey = "04401a5e5263f12ae9fb23f6e2f1ed77";
  let city = document.querySelector("#city-input").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(showWeather);

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


let form = document.querySelector("#search-form");
form.addEventListener("submit", typeCity);

let currentLocation = document.querySelector ("#current-loc");
currentLocation.addEventListener ("click", showCurrentLoc);

//function celsiusTemp(event) {
  //event.preventDefault();
  //let celsius = document.querySelector("#temperature");
  // celsius.innerHTML = 19;   
//}

//let todayTempCelsius = document.querySelector("#celsius");
//todayTempCelsius.addEventListener("click", celsiusTemp);

//function fahreneitTemp(event) {
  //event.preventDefault();
  //let fahreneit = document.querySelector("#temperature");
  //fahreneit.innerHTML = 66;
//}

//let todayTempFahreneit = document.querySelector("#fahreneit");
//todayTempFahreneit.addEventListener("click", fahreneitTemp);




