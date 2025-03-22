export function drawTemperatureChart(forecastData) {
    const labels = forecastData.list.slice(0, 5).map(item => 
        new Date(item.dt * 1000).toLocaleDateString()
    );
    const temperatures = forecastData.list.slice(0, 5).map(item => item.main.temp);

    const ctx = document.getElementById('tempChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures,
                borderColor: '#007bff',
                fill: false
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}