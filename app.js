function displayTemperature(response) {
 console.log(response.data);
 let temperature=document.querySelector("temperature");
 temperature.innerHTML=Math.round(response.data.main.temp);
 let city=document.querySelector("city");
 city.innerHTML=respond.data.name;
 let wind=document.querySelector("wind");
 wind.innerHTML=Math.round(response.data.wind.speed);
 let humidity=document.querySelector("humidity");
 humidity.innerHTML=response.data.main.humidity
}
let apiKey = "2daf65f0cdaa917f11026e8a128ce271";
let url = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(url).then(displayTemperature)