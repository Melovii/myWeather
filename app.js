const API_KEYS = {
    WEATHER: 'X3WL6UFP39QRKSNKS4JDBEYWS',
    UNSPLASH: 'zqA-z5iGBDygUhjo35PiiGD32vkEzF4KtSI_xui0AX4',
};

async function fetchBackgroundImage(condition) {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?query=${condition}&client_id=${API_KEYS.UNSPLASH}`);
        const data = await response.json();
        return data.urls.full;
    } catch (error) {
        console.log('Error fetching background image:', error);
    }
}

async function fetchWeather(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEYS.WEATHER}`);
        const data = await response.json();
        console.log(data);
        return processWeatherData(data);
    } catch (error) {
        console.log('Error fetching weather data:', error);
    }
}

function processWeatherData(data) {
    if (!data || !data.currentConditions) {
        return null;
    }

    return {
        conditions: data.currentConditions.conditions,
        temp: ((data.currentConditions.temp - 32) * (5/9)).toFixed(1),
        feelslike: ((data.currentConditions.feelslike - 32) * (5/9)).toFixed(1),
        sunrise: data.currentConditions.sunrise,
        sunset: data.currentConditions.sunset,
        humidity: data.currentConditions.humidity,
        windspeed: (data.currentConditions.windspeed * 1.60934).toFixed(1),
        address: data.resolvedAddress,
    };
}

async function displayWeatherData(data) {
    const weatherInfoDiv = document.getElementById('weather-info');
    weatherInfoDiv.innerHTML = `
    <h2>${data.address}</h2>
    <p>Conditions: ${data.conditions}</p>
    <p>Temperature: ${data.temp}°C</p>
    <p>Feels like: ${data.feelslike}°C</p>
    <p>Humidity: ${data.humidity}%</p>
    <p>Wind Speed: ${data.windspeed} kmh</p>
    <p>Sunrise: ${data.sunrise}</p>
    <p>Sunset: ${data.sunset}</p>
  `;

    const backgroundImageURL = await fetchBackgroundImage(data.conditions);
    if (backgroundImageURL) {
        document.body.style.backgroundImage = `url(${backgroundImageURL})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundRepeat = 'no-repeat';
    }
}

document.getElementById('location-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const location = document.getElementById('location-input').value;

    if (!location) {
        return;
    }

    const loadingDiv = document.getElementById('loading');
    loadingDiv.style.display = 'block';

    const weatherData = await fetchWeather(location);
    loadingDiv.style.display = 'none';
    if (weatherData) {
        console.log(weatherData);
        displayWeatherData(weatherData);
    } else {
        console.log('Error fetching weather data');
    }
});