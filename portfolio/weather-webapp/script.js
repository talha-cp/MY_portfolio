const searchbox = document.getElementById("search-box");
const searchbtn = document.getElementById("search-btn");
const weathericon = document.querySelector(".weather-icon");
const weathercard = document.querySelector(".weather-card");
const message = document.querySelector(".message");

const cityy = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const windspeed = document.querySelector(".windspeed");
const feelslike = document.querySelector(".feelslike");
const visibility = document.querySelector(".visibility");
const pressure = document.querySelector(".pressure");
const dat = document.querySelector(".date");

window.addEventListener("load", () => {
  weathercard.style.opacity = ".7";
});

const apiurl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiurllatlong =
  "https://api.openweathermap.org/data/2.5/weather?units=metric";

const apikey = "474317115933e3b98d7322811cc1723a";

async function weathercheckk(city) {
  const response = await fetch(apiurl + city + `&appid=${apikey}`);
  if (response.status == 404) {
    message.innerHTML = "Invalid city";
    message.style.color = "red";
    message.style.visibility = "visible";
  } else {
    searchbox.value = "";
    message.style.visibility = "hidden";
    var data = await response.json();
    if (data.weather[0].main == "Clouds") {
      weathericon.src = "imgs/cloudy.png";
    } else if (data.weather[0].main == "Clear") {
      weathericon.src = "imgs/clear-sky.png";
    } else if (data.weather[0].main == "Rain") {
      weathericon.src = "imgs/storm.png";
    } else if (data.weather[0].main == "Drizzle") {
      weathericon.src = "imgs/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weathericon.src = "imgs/fog.png";
    }
  }
  var dt = new Date();
  var modifydt = currentdate(dt);

  cityy.innerHTML = data.name;
  temp.innerHTML = Math.round(data.main.temp) + "°c";
  humidity.innerHTML = data.main.humidity + "%";
  windspeed.innerHTML = data.wind.speed + " km/h";
  feelslike.innerHTML = data.main.feels_like + " °c";
  visibility.innerHTML = data.visibility / 1000 + " km";
  pressure.innerHTML = data.main.pressure + " mBar";
  dat.innerHTML = modifydt;
}

async function weathercheck(lat, lon) {
  const response = await fetch(
    apiurllatlong + `&lat=${lat}` + `&lon=${lon}` + `&appid=${apikey}`
  );
  if (response.status == 404) {
    message.innerHTML = "An error occured";
    message.style.color = "red";
    message.style.visibility = "visible";
  } else {
    searchbox.value = "";
    message.innerHTML = "Current";
    message.style.color = "white";
    message.style.visibility = "visible";
    var data = await response.json();
    if (data.weather[0].main == "Clouds") {
      weathericon.src = "imgs/cloudy.png";
    } else if (data.weather[0].main == "Clear") {
      weathericon.src = "imgs/clear-sky.png";
    } else if (data.weather[0].main == "Rain") {
      weathericon.src = "imgs/storm.png";
    } else if (data.weather[0].main == "Drizzle") {
      weathericon.src = "imgs/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weathericon.src = "imgs/fog.png";
    }
  }
  var dt = new Date();
  var modifydt = currentdate(dt);
  cityy.innerHTML = data.name;
  temp.innerHTML = Math.round(data.main.temp) + "°c";
  humidity.innerHTML = data.main.humidity + "%";
  windspeed.innerHTML = data.wind.speed + " km/h";
  feelslike.innerHTML = data.main.feels_like + " °c";
  visibility.innerHTML = data.visibility / 1000 + " km";
  pressure.innerHTML = data.main.pressure + " mBar";
  dat.innerHTML = modifydt;
}

searchbtn.addEventListener("click", () => {
  weathercheckk(searchbox.value);
});

async function gotlocation(position) {
  const result = await weathercheck(
    position.coords.latitude,
    position.coords.longitude
  );
}
async function failedloc() {
  weathercheckk("hell");
}
window.addEventListener("load", async () => {
  navigator.geolocation.getCurrentPosition(gotlocation, failedloc);
});

function currentdate(s) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[s.getDay()];
  let date = s.getDate();
  let month = months[s.getMonth()];
  let year = s.getFullYear();
  return `${day}, ${date} ${month}, ${year}`;
}
