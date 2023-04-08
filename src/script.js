function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayData(response) {
  let tempElement = document.querySelector("#temp-number");
  let cityElement = document.querySelector("#city");
  let dateTimeElement = document.querySelector("#date-time-info");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  tempElement.innerHTML = Math.round(response.data.main.temp);
  dateTimeElement.innerHTML = formatDate(response.data.dt * 1000);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "74373fd9c9c828199b66c103f4039a7d";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=amsterdam&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayData);
