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
];

let day =days[date.getDay()];
let heading = document.querySelector("#date");
heading.innerHTML = `${day},${hours}:${minutes}`;
}



function displayTemperature(response) {
 console.log(response.data);
 let temperature=document.querySelector("#temperature");
 temperature.innerHTML=Math.round(response.data.main.temp);
 let city=document.querySelector("#city");
 city.innerHTML=respond.data.name;
 let wind=document.querySelector("#wind");
 wind.innerHTML=Math.round(response.data.wind.speed);
 let humidity=document.querySelector("#humidity");
 humidity.innerHTML=(response.data.main.humidity);
 let description=document.queerySelector("#description");
 description.innerHTML=(response.data.main.description);
 let date=document.querySelector("#date");
 
  let currentCity = response.data.name;
  let Cities = document.querySelector("h1");
  Cities.innerHTML = `${currentCity}`;
}
function searchCity(event) {
 event.preventDefault();
 let searchInput = document.querySelector("#city-input");
   let city = `${searchInput.value}`;
let apiKey = "2daf65f0cdaa917f11026e8a128ce271";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
axios.get(url).then(displayTemperature)
}
let searchBar = document.querySelector("#search-form");
searchBar.addEventListener("submit", searchCity);
