document.addEventListener('DOMContentLoaded', function () {
    const searchBtn = document.getElementById('searchBtn');
    const locationInput = document.getElementById('location');
    const unitToggleBtn = document.getElementById('unit-toggle');
    let currentTemp = 0;
    let isMetric = true;

    searchBtn.addEventListener('click', getWeather);
    locationInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') getWeather();
    });
    unitToggleBtn.addEventListener('click', toggleTemperatureUnit);

    function toggleTemperatureUnit() {
        isMetric = !isMetric;
        const tempElement = document.getElementById('temperature');
        if (isMetric) {
            currentTemp = (currentTemp - 32) * 5/9;
        } else {
            currentTemp = (currentTemp * 9/5) + 32;
        }
        tempElement.textContent = `${Math.round(currentTemp)}°${isMetric ? 'C' : 'F'}`;
    }

    function getWeather() {
        const location = locationInput.value;

        if (!location) {
            showError('Please enter a location');
            return;
        }

        const apiKey = '8778e787ebd9fb8c92fecac77881e198';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        showLoading();

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) throw new Error('City not found');
                return response.json();
            })
            .then(data => {
                updateWeatherUI(data);
            })
            .catch(error => {
                showError(error.message);
            });
    }

    function updateWeatherUI(data) {
        const weatherContainer = document.querySelector('.weather-container');
        const cityName = document.getElementById('city-name');
        const weatherIcon = document.getElementById('weather-icon');
        const temperatureElement = document.getElementById('temperature');
        const descriptionElement = document.getElementById('description');
        const humidityElement = document.getElementById('humidity');
        const windSpeedElement = document.getElementById('wind-speed');
        const pressureElement = document.getElementById('pressure');

        currentTemp = data.main.temp;
        
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        temperatureElement.textContent = `${Math.round(currentTemp)}°C`;
        descriptionElement.textContent = capitalizeFirstLetter(data.weather[0].description);
        humidityElement.textContent = `${data.main.humidity}% Humidity`;
        windSpeedElement.textContent = `${Math.round(data.wind.speed * 3.6)} km/h Wind`;
        pressureElement.textContent = `${data.main.pressure} hPa`;

        weatherContainer.style.display = 'block';
        weatherContainer.style.opacity = '1';
    }

    function showLoading() {
        const weatherContainer = document.querySelector('.weather-container');
        weatherContainer.style.opacity = '0.5';
    }

    function showError(message) {
        alert(message);
        const weatherContainer = document.querySelector('.weather-container');
        weatherContainer.style.opacity = '1';
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});
