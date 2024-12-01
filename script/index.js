function showWeather(){
    const API_KEY = `ba40d66aba8cb487d21d4f71a3a15d7c`;
    const cityWeather = document.getElementById('city').value;

    if(!cityWeather){
        alert('Please enter a city.');
        return;
    }

    //In estafa terms eto ang source mo ng goodshit//
    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityWeather}&appid=${API_KEY}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityWeather}&appid=${API_KEY}`;

    //let's say eto si parokya 1 na kukuha kay source(url)
    fetch(currentWeatherURL)
    .then(response => response.json())
    .then(data => {
        displayWeather(data);
    })
    .catch(error => {
        console.error('Error fetching current weather data:', error);
        alert('Error fetching current weather data. Please try again.');
    });

    //parokya 2 na kukuha kay source(url)
    fetch(forecastURL)
    .then(response => response.json())
    .then(data => {
        displayHourlyForecast(data.list);
    })
    .catch(error => {
        console.error('Error fetching hourly forecast data:', error);
        alert('Error fetching hourly forecast data. Please try again.');
    });
}

//eto naman papakita yung mga information ng weather ng isang lugar like kung ano yung magiging weather in the next 24 hours or something syaka ano temperature
function displayWeather(data){
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastdiv = document.getElementById('hourly-forecast');

    //Clear Previous Content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastdiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if(data.cod === '404'){
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;    
    }
    else{
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        const temperatureHTML = `<p>${temperature}°C</p>`;
        const weatherHtml = `
                <p>${cityName}</p>
                <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData){

    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8);


    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHTML = 
        `
        <div class = "hourly-item">
        <span>${hour}:00</span>
        <img src="${iconUrl}" alt="Hourly Weather Icon">
        <span>${temperature}</span>
        </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHTML;
    });
}

function showImage(){
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}