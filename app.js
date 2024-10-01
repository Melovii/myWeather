const API_KEYS = {
    WEATHER: 'INSERT WEATHER API KEY HERE',
    NEWS: 'INSERT NEWS API KEY HERE',
    GIFS: 'INSERT GIF API KEY HERE',
    UNSPLASH: 'INSERT UNSPLASH API KEY HERE',
};

async function fetchWeather(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEYS.WEATHER}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error fetching weather data:', error);
    }
}

document.getElementById('location-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const location = document.getElementById('location-input').value;
    const weatherData = await fetchWeather(location);
    console.log(weatherData);
});