import { getCurrentWeather, getForecast } from './api.js';
import { drawTemperatureChart } from './chart.js';

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const currentWeatherDiv = document.getElementById('currentWeather');
const forecastDiv = document.getElementById('forecast');

searchBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (!city) return alert("Please enter a city name");

    try {
        // Lấy và hiển thị thời tiết hiện tại
        const currentData = await getCurrentWeather(city);
        const { name, main: { temp, humidity }, wind: { speed } } = currentData;
        currentWeatherDiv.innerHTML = `
            <h2>${name}</h2>
            <p>Temperature: ${temp}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${speed} m/s</p>
        `;

        // Lấy và hiển thị dự báo
        const forecastData = await getForecast(city);
        forecastDiv.innerHTML = forecastData.list.slice(0, 5).map(item => {
            const date = new Date(item.dt * 1000).toLocaleDateString();
            return `
                <div>
                    <p>${date}</p>
                    <p>${item.main.temp}°C</p>
                </div>
            `;
        }).join('');

        // Vẽ biểu đồ
        drawTemperatureChart(forecastData);
    } catch (error) {
        currentWeatherDiv.innerHTML = `<p>${error.message}</p>`;
        forecastDiv.innerHTML = '';
    }
});