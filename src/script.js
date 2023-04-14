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

function retrieveForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "74373fd9c9c828199b66c103f4039a7d";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
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

  console.log(response.data);
  retrieveForecast(response.data.coord);
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col">
              <ul>
                <li class="forecast-day">${day}</li>
                <li>
                  <img
                    src="https://openweathermap.org/img/wn/04d@2x.png"
                    alt=""
                    width="65px"
                  />
                </li>
                <li>
                  <span class="forecast-temp-max">18°</span>
                  <span class="forecast-temp-min">12°</span>
                </li>
              </ul>
            </div>
          `;
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

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round((celciusTemperature * 9) / 5 + 32);
  let tempElement = document.querySelector("#temp-number");
  tempElement.innerHTML = fahrenheitTemp;
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelciusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp-number");
  tempElement.innerHTML = celciusTemperature;
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

// Global Variables Definition & Unit Link Event Listeners

let celciusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemp);

// User-Involuntary Invoking of Functions

search("amsterdam");
