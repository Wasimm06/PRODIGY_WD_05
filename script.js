const apiKey = '0727359f345a23a3a3e0704ecca99ad3';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('windSpeed');
const weatherIconElement = document.getElementById('weatherIcon');
const errorTextElement = document.getElementById('errorText');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    } else {
        showError('Please enter a city.');
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.innerHTML = `<i class="fas fa-thermometer-half"></i> ${Math.round(data.main.temp)}°C`;
            descriptionElement.innerHTML = `<i class="fas fa-cloud"></i> ${data.weather[0].description}`;
            humidityElement.innerHTML = `<i class="fas fa-tint"></i> Humidity: ${data.main.humidity}%`;
            windSpeedElement.innerHTML = `<i class="fas fa-wind"></i> Wind Speed: ${data.wind.speed} m/s`;
            // Update weather icon dynamically based on weather condition
            const weatherIconClass = getWeatherIconClass(data.weather[0].icon);
            weatherIconElement.className = `fas ${weatherIconClass}`;
            clearError();
        })
        .catch(error => {
            showError('Error fetching weather data.');
            console.error('Error fetching weather data:', error);
        });
}

function getWeatherIconClass(iconCode) {
    const iconMappings = {
        '01d': 'fa-sun',
        '01n': 'fa-moon',
        '02d': 'fa-cloud-sun',
        '02n': 'fa-cloud-moon',
        '03d': 'fa-cloud',
        '03n': 'fa-cloud',
        '04d': 'fa-cloud',
        '04n': 'fa-cloud',
        '09d': 'fa-cloud-showers-heavy',
        '09n': 'fa-cloud-showers-heavy',
        '10d': 'fa-cloud-sun-rain',
        '10n': 'fa-cloud-moon-rain',
        '11d': 'fa-bolt',
        '11n': 'fa-bolt',
        '13d': 'fa-snowflake',
        '13n': 'fa-snowflake',
        '50d': 'fa-smog',
        '50n': 'fa-smog',
    };

    return iconMappings[iconCode] || 'fa-question';
}

function showError(message) {
    errorTextElement.textContent = message;
}

function clearError() {
    errorTextElement.textContent = '';
}
