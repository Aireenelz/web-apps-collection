// weather web app

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "api key";

weatherForm.addEventListener("submit", async event => {
    // by default, after submitting a form, it will refresh the page
    // we want to prevent it from refreshing 
    event.preventDefault();

    // get the city inputted by user
    const city = cityInput.value;

    // if city have a value
    // retrieve the weather information and display it
    if(city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch(error) {
            console.error(error);
            displayError(error);
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    // go to https://openweathermap.org/current
    // find the API call where we can pass in a city name
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);
    console.log(response);

    if(!response.ok) {
        throw new Error("Could not fetch weather data.");
    }

    // return fetched data to eventListener
    return await response.json();
}

function displayWeatherInfo(data) {
    console.log(data);

    // from the one big object of fetched data, we destructure it to get the information we want
    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;
    
    card.textContent = "";
    card.style.display = "flex";

    // create the html elements which will be used to display our weather information
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    // assign the content to fill the placeholders 
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    descDisplay.textContent = description;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    weatherEmoji.textContent = getWeatherEmoji(id);

    // apply CSS
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    descDisplay.classList.add("descDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    // fill the content into the placeholder
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(descDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
    /* weather condition codes from https://openweathermap.org/weather-conditions
     * group 2xx: thunderstorm
     * group 3xx: drizzle
     * group 5xx: rain
     * group 6xx: snow
     * group 7xx: atmosphere
     * group 800: clear
     * group 80x: clouds
     */

    switch(true) {
        case(weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case(weatherId >= 300 && weatherId < 400):
            return "☔";
        case(weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case(weatherId >= 600 && weatherId < 700):
            return "☃️";
        case(weatherId >= 700 & weatherId < 800):
            return "🌫️";
        case(weatherId === 800):
            return "☀️";
        case(weatherId >= 801 && weatherId < 810):
            return "⛅";
        default:
            return "❓";
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p"); // create a new <p> element in the HTML doc
    errorDisplay.textContent = message; // set the text content of the <p> element as passed "message" parameter
    errorDisplay.classList.add("errorDisplay"); // apply CSS class "errorDisplay" to the <p> element

    card.textContent = ""; // clear exsiting content of the "card" element
    card.style.display = "flex"; 
    card.appendChild(errorDisplay);
}