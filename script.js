const apiKey = "563772fbf5bc2a72a736d865da1a6e7e";

//mengambil elemetn html location
const locationElement = document.getElementById("location");
const temperatur = document.getElementById("temperature");
const description = document.getElementById("description");
const weatherIconElement = document.getElementById("weather-icon")

//function untuk dapatkan cuaca dari weathermap
async function getWeather(lattitute, longtitut) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lattitute}&lon=${longtitut}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    
    locationElement.textContent = `${data.name},${data.sys.country}`;

    temperatur.textContent = `Temperature : ${data.main.temp} °C`

    description.textContent = `Description: ${data.weather[0].main}`

    const iconCode = data.weather[0].icon;
    weatherIconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="weather icon">`


  } catch (error) {
    console.error("error fetching weathe rdata : ");
    alert("failed to fetching weather data, please try again later");
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lattitute = position.coords.latitude;
        const longtitut = position.coords.longitude;
        getWeather(lattitute, longtitut);
      },
      (error) => {
        alert("failed to get your location, please enable location service");
      }
    );
  } else {
    alert("geolcaotion is not support in your browser");
  }
}

//memanggil fungsi geolocation ketika halaman di muat

window.onload = getLocation;
