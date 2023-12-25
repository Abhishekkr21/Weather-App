document.addEventListener('DOMContentLoaded', function () {
  const searchBtn = document.getElementById('searchBtn');
  searchBtn.addEventListener('click', getWeather);
});

function getWeather() {
  const locationInput = document.getElementById('location');
  const location = locationInput.value;

  if (!location) {
    alert('Please enter a location');
    return;
  }

  // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
   const apiKey = '8778e787ebd9fb8c92fecac77881e198';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const weatherIcon = document.getElementById('weather-icon');
      const temperatureElement = document.getElementById('temperature');
      const descriptionElement = document.getElementById('description');
      const weatherContainer = document.querySelector('.weather-container');

      if (data.weather && data.weather[0]) {
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
        weatherIcon.src = iconUrl;
      }

      if (data.main) {
        const temperature = data.main.temp;
        temperatureElement.textContent = `Temperature: ${temperature} °C`;
      }

      if (data.weather && data.weather[0]) {
        const description = data.weather[0].description;
        descriptionElement.textContent = `Description: ${description}`;
      }

      weatherContainer.style.display = 'block';
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert('Error fetching weather data. Please try again.');
    });
}
