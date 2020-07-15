
// api key : 29d9468e430b81873d29435baf653dd6

//Elements

const iconElem = document.querySelector(".weather-icon")
const notificationElem = document.querySelector(".notification")
const tempElem = document.querySelector(".temperature-value p")
const descElem = document.querySelector(".temperature-description p")
const locationElem = document.querySelector(".location p")
const unitElem = document.querySelector(".toggle button p")
 
//Data to be stroed

const weather = {};
const KELVIN = 273;
const KEY = "29d9468e430b81873d29435baf653dd6"

weather.temperature = {
    unit: "celsius"
}

//HTML geolocation API
if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(success,error)
}else {
    notificationElem.style.display ="block";
    notificationElem.innerHTML="<p> Browser does not support geolocation</p>";
}

function success(position){
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    getWeather(latitude, longitude);
}

function error(err) {
    notificationElem.style.display="block";
    notificationElem.innerHTML = `<p>${err.message}</p>`
}

function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}`;

    console.log(api);

    fetch(api)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconID = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.backgroundImg = data.weather[0].main;
        })
        .then(function(){
            displayWeather();
        });
}

function displayWeather(){
    iconElem.innerHTML = `<img src="icons/${weather.iconID}.png"/>`;
    tempElem.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElem.innerHTML = weather.description;
    locationElem.innerHTML = `${weather.city}, ${weather.country}`;
    changeBackground(); // chnages the background from weather main proptery
}

// celsius to Fahrenheit

function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}


function changeTemp() {
    // if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit == "celsius") {
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElem.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
        unitElem.innerHTML = "Change to °C";
    }else{
        tempElem.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
        unitElem.innerHTML = "Change to °F";
    }
}

function changeBackground () {
    switch (weather.backgroundImg) {
        case 'Thunderstorm': document.body.style.background = "url('./images/thunderstrom.jpg') center/100% 100% no-repeat";
        break;

        case 'Drizzle': document.body.style.background = "url('./images/drizzle.jpg') center/100% 100% no-repeat";
        break;
        
        case 'Rain': document.body.style.background = "url('./images/rain.jpg') center/100% 100% no-repeat";
        break;

        case 'Snow': document.body.style.background = "url('./images/snow.jpg')center/100% 100% no-repeat";
        break;

        case 'Mist': document.body.style.background = "url('./images/mist.jpg') center/100% 100% no-repeat";
        break;

        case 'Fog': document.body.style.background = "url('./images/fog.jpg') center/100% 100% no-repeat";
        break;

        case 'Tornado' :document.body.style.background = "url('./images/tornado.jpg') center/100% 100% no-repeat";
        break;

        case 'Clear': document.body.style.background = "url('./images/clear.jpg') center/100% 100% no-repeat";
        break;

        case 'Clouds': document.body.style.background = "url('./images/clouds.jpg') center/100% 100% no-repeat";
        break;

        case 'Sand' : document.body.style.background = "url('./images/sand.jpg') center/100% 100% no-repeat";
        break;

        default: 
        break;

}
}