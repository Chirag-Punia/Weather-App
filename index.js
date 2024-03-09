const form = document.querySelector('.search-form')
const search = document.querySelector('.search-input')
const cityName = document.querySelector('.city-name')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')
const windSpeed = document.querySelector('.wind-speed')
const weatherImage = document.querySelector('.found-data img')
const description = document.querySelector('.description')

const weatherData = document.querySelector('.found-data')
const errorImg = document.querySelector('.error')


//search.value is a city name


form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!search.value) {
        console.log('no city added')
        weatherData.classList.add('d-none')
        errorImg.classList.remove('d-none')
    }
    else {
        cityName.innerText = search.value;
        weatherData.classList.remove('d-none')
        errorImg.classList.add('d-none')
        getWeatherByCity(search.value)

    }

})



async function getWeatherByCity(myCity) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${myCity}&appid=573e5d92a653700269ea7f131aa47b11&units=metric`
        const res = await fetch(url)
        const data = await res.json()
        console.log(data)
        temperature.innerText = `${data.main.temp}°C`;
        description.innerText = data.weather[0].description;
        humidity.innerText = `${data.main.humidity}% humidity`
        windSpeed.innerText = `${((data.wind.speed) * 3.6).toFixed(1)} km/h`
        const imageName = data.weather[0].main;
        const imageArray = ['Clear', 'Clouds', 'Mist', 'Rain', 'Snow'];
        if (imageArray.includes(imageName)) {
            const imageSource = `./images/${imageName}.png`
            weatherImage.src = imageSource;
        }
        else {
            weatherImage.src = "./images/Clouds.png";
        }
        search.value = ''
    }
    catch (e) {
        console.log(e);
        weatherData.classList.add('d-none')
        errorImg.classList.remove('d-none')
    }
}


//for auto detection of location
// navigator.geolocation.getCurrentPosition((position) => {
//     getWeather(position.coords.latitude, position.coords.longitude);
// });
// async function getWeatherAtomatically(lat, long) {
//     try {
//         const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=573e5d92a653700269ea7f131aa47b11`
//         const res = await fetch(url)
//         const data = await res.json();
//         const display1 = document.createElement("div");
//         display1.innerText = `${data.name},${data.weather[0].description}`;
//         document.body.append(display1);
//     }
//     catch (e) { console.log(e) }
// }

// navigator.geolocation provides a 'geolocation' object, onwhcih we can use the method getcurrent position or watchposition.
// both methods can have upto 3 arguements : success function(mandatory) , error function, and  