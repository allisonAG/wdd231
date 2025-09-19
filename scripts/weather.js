const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector("figcaption");

const mykey = "2022606d1a0aabd50e7f494d81ad3230"
const myLat = "49.75"
const myLong = "6.64"

const url = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${mykey}&units=metric`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
        
    } catch (error) {
        console.log(error);
    }
}



function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    captionDesc.innerHTML = data.weather[0].description;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', data.weather[0].description); 
}

apiFetch();