const API_KEYS = {
    WEATHER: 'X3WL6UFP39QRKSNKS4JDBEYWS',
    NEWS: 'INSERT NEWS API KEY HERE',
    GIFS: 'INSERT GIF API KEY HERE',
    UNSPLASH: 'INSERT UNSPLASH API KEY HERE',
};

async function fetchWeather(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEYS.WEATHER}`);
        const data = await response.json();
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
        feelslike: data.currentConditions.feelslike,
        sunrise: data.currentConditions.sunrise,
        sunset: data.currentConditions.sunset,
        humidity: data.currentConditions.humidity,
        windspeed: data.currentConditions.windspeed,
        temp: data.currentConditions.temp,
        address: data.resolvedAddress,
    };
}

function displayWeatherData(data) {
    const weatherInfoDiv = document.getElementById('weather-info');
    weatherInfoDiv.innerHTML = `
    <h2>${data.address}</h2>
    <p>Conditions: ${data.conditions}</p>
    <p>Feels like: ${data.feelslike}°C</p>
    <p>Humidity: ${data.humidity}%</p>
    <p>Wind Speed: ${data.windspeed} kmh</p>
    <p>Temperature: ${data.temp}°C</p>
    <p>Sunrise: ${data.sunrise}</p>
    <p>Sunset: ${data.sunset}</p>
    `;
}

document.getElementById('location-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const location = document.getElementById('location-input').value;

    const weatherData = await fetchWeather(location);
    if (weatherData) {
        console.log(weatherData);
        displayWeatherData(weatherData);
    } else {
        console.log('Error fetching weather data');
    }
});