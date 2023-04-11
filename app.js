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
function formatDay(timestamp) {
  let date = new Date(timestamp *1000)
  let day=date.getDay();
  let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
  return days[day];
}

function displayforecast(response){
  let forecast=response.data.daily;
  let forecastElement=document.querySelector("#forecast");
  let forecastHTML=`<div class="row">`;
  forecast.forEach(function (forecastDay,index) {
    if (index<6){
    forecastHTML=
  forecastHTML + `
  <div class="col-2">
  <div class="weather-forecast -date">${formatDay(forecastDay.dt)}</div>
  <img src=" https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt=""width="42">
  <div class="weather-forecast-temp"><span class="max-temp">${Math.round(forecastDay.temp.max)}°</span>
  <span class="min-temp">${Math.round(forecastDay.temp.min)}°</span>
  </div>
  </div>
  `}
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