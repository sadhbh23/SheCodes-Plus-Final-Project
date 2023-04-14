// Functions Definition

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

function formatDateForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function retrieveForecast(coordinates) {
  let apiKey = "74373fd9c9c828199b66c103f4039a7d";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayData(response) {
  let tempElement = document.querySelector("#temp-number");
  let cityElement = document.querySelector("#city");
  let dateTimeElement = document.querySelector("#date-time-info");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");

  celciusTemperature = Math.round(response.data.main.temp);

  tempElement.innerHTML = celciusTemperature;
  dateTimeElement.innerHTML = formatDate(response.data.dt * 1000);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  retrieveForecast(response.data.coord);
}

function displayForecast(response) {
  let forecastData = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  forecastData.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col">
              <ul>
                <li class="forecast-day">${formatDateForecast(
                  forecastDay.dt
                )}</li>
                <li>
                  <img
                    src="https://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    alt=""
                    width="75px"
                  />
                </li>
                <li>
                  <span class="forecast-temp-max">${Math.round(
                    forecastDay.temp.max
                  )} °</span>
                  <span class="forecast-temp-min">${Math.round(
                    forecastDay.temp.min
                  )} °</span>
                </li>
              </ul>
            </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(city) {
  let apiKey = "74373fd9c9c828199b66c103f4039a7d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayData);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  cityInputElement.value.trim();
  search(cityInputElement.value);
}

// Global Variables Definition & Unit Link Event Listeners

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// User-Involuntary Invoking of Functions

search("amsterdam");
