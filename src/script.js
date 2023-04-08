function displayData(response) {
  let tempElement = document.querySelector("#temp-number");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  tempElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "74373fd9c9c828199b66c103f4039a7d";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=amsterdam&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayData);
