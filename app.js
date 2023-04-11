function formatDate(timestamp) {
  let date =new Date(timestamp);
  let hours= date.getHours();
 let minutes=date.getMinutes();
 if (minutes<10) {
   minutes=`0${minutes}`;
 }
 if(hours<10) {
  hour=`0${hours}`
 }
 let days=[
   "Sunday",
 "Monday",
 "Tuesday",
 "Wednesday",
 "Thursday",
 "Friday",
 "Saturday"
]
let day =days[date.getDay()];
 return`${day},${hours}:${minutes}`;
}

function displayforecast(response){
  console.log(response.data.daily);
  let forecastElement=document.querySelector("#forecast");
  let forecastHTML=`<div class="row">`;
  let days=["Tue","Wed","Thu","Fri"];
  days.forEach(function (day) {
    forecastHTML=
  forecastHTML + `
  <div class="col-2">
  <div class="weather-forecast -date">${day}</div>
  <img src="https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v3/Condition_Card/SunnyDayV3.svg" alt=""width="56">
  <div class="weather-forecast-temp"><span class="max-temp">20°</span>
  <span class="min-temp">12°</span>
  </div>
  </div>
  `
  });
  forecastHTML=forecastHTML +`</div>`;
  forecastElement.innerHTML=forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2daf65f0cdaa917f11026e8a128ce271";
  let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayforecast)
}
function displayTemperature(response) {
 console.log(response.data);
 let temperatureElement=document.querySelector("#temperature");
 temperatureElement.innerHTML=Math.round(response.data.main.temp);
 let cityElement=document.querySelector("#city");
 cityElement.innerHTML=(response.data.name);
 let windElement=document.querySelector("#wind");
 windElement.innerHTML=Math.round(response.data.wind.speed);
 let humidity=document.querySelector("#humidity");
 humidity.innerHTML=(response.data.main.humidity);
 let description=document.querySelector("#description");
 description.innerHTML=(response.data.weather[0].description);
 let date=document.querySelector("#date");
 date.innerHTML=formatDate(response.data.dt)
 let icon=document.querySelector("#icon");
 icon.setAttribute("src",` https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
 icon.setAttribute("alt",response.data.weather[0].description)
 celsiusTemp=response.data.main.temp;

 getForecast(response.data.coord);
}
function search(city) {
  let units = "metric";
let apiKey = "2daf65f0cdaa917f11026e8a128ce271";
  let url = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${url}${city}&units=${units}&appid=${apiKey}`;
  
axios.get(apiUrl).then(displayTemperature)
}
function searchCity(event) {
  event.preventDefault();
  let cities=document.querySelector("#city-input");
search(cities.value);

}



let form=document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement=document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp=(celsiusTemp*9/5)+32
  temperatureElement.innerHTML=Math.round(fahrenheitTemp);
}
let celsiusTemp="null"
let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature); 

function displayCelsiusTemperature(event) {
 event.preventDefault();
 let temperatureElement=document.querySelector("#temperature");
 celsiusLink.classList.add("active");
 fahrenheitLink.classList.remove("active");
  
 temperatureElement.innerHTML=Math.round(celsiusTemp) 
}

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click" , displayCelsiusTemperature);
search("Lagos")