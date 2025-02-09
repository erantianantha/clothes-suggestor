const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod !== 200) {
            alert("City not found!");
            return;
        }

        // Extract weather details
        const temp = Math.round(data.main.temp);
        const condition = data.weather[0].description;
        document.getElementById("cityName").innerText = data.name;
        document.getElementById("temperature").innerText = `Temperature: ${temp}°C`;
        document.getElementById("condition").innerText = `Condition: ${condition}`;

        // Suggest an outfit based on temperature
        let outfit = "";
        if (temp > 25) {
            outfit = "T-shirt, shorts, and sunglasses. Stay cool! 😎";
        } else if (temp > 15) {
            outfit = "Light jacket or sweater with jeans. Perfect weather! 🌤";
        } else if (temp > 5) {
            outfit = "Coat, scarf, and warm clothes. Stay cozy! ❄️";
        } else {
            outfit = "Heavy jacket, gloves, and a beanie. It's freezing! 🥶";
        }

        document.getElementById("outfit").innerText = outfit;
    } catch (error) {
        alert("Error fetching weather data. Try again later.");
    }
}
