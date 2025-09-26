import { getMemberData } from "./dataService.mjs";

// Weather Section

const weatherIcon = document.querySelector('#w-icon');
const icon = document.createElement('img');
const currentTemp = document.querySelector('#current-weather');
const captionDsc = document.querySelector("#desc");
const highTemp = document.querySelector("#high");
const lowTemp = document.querySelector("#low");
const humidity = document.querySelector("#humidity");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");

const mykey = "2022606d1a0aabd50e7f494d81ad3230"
const myLat = "19.28"
const myLong = "-99.65"

const currentUrl = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${mykey}&units=metric`;
const forecastUrl = `//api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${mykey}&units=metric`;

async function apiFetch() {
    try {
        const response = await fetch(currentUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }

    } catch (error) {
        console.log(error);
    }
}

async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }

    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.setAttribute('src', iconsrc);
    icon.setAttribute('alt', data.weather[0].description);
    weatherIcon.appendChild(icon);
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    captionDsc.innerHTML = data.weather[0].description;
    highTemp.innerHTML = `${data.main.temp_max}&deg;`;
    lowTemp.innerHTML = `${data.main.temp_min}&deg;`;
    humidity.innerHTML = `${data.main.humidity}%`;

    const sunriseTime = new Date(data.sys.sunrise * 1000);
    const sunsetTime = new Date(data.sys.sunset * 1000);

    sunrise.innerHTML = sunriseTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    sunset.innerHTML = sunsetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function displayForecast(data) {
    const dayDivs = [
        document.querySelector('#day1'),
        document.querySelector('#day2'),
        document.querySelector('#day3')
    ];

    const days = {}; 

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        if (!days[dayName]) days[dayName] = [];
        days[dayName].push(item.main.temp);
    });


    let i = 0;
    for (let day in days) {
        if (i >= 3) break;
        dayDivs[i].innerHTML = `<strong>${day}</strong>: ${days[day][0]}&deg;F`;
        i++;
    }
}

// Spotlights Section

const spotlights = document.querySelector('#spotlights');
//1 = member, 2 = silver, 3 = gold

(async () => {
    const members = await getMemberData();
    const filtered = members.filter(m =>
        m.membershiplevel === 2 || m.membershiplevel === 3
    );
    const selected = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);
    displaySpotlights(selected);
})();

function displaySpotlights(members) {

    const membershipNames = {
        1: "Member",
        2: "Silver",
        3: "Gold"
    };

    members.forEach(member => {
        const card = document.createElement('section');
        const cardContent = document.createElement('div');
        const cardInfo = document.createElement('div');
        const image = document.createElement('img');
        const name = document.createElement('h2');
        const address = document.createElement('p');
        const phone = document.createElement('p');
        const website = document.createElement('a');
        const level = document.createElement('p');
        card.classList.add('card');
        cardContent.classList.add('card-content');
        cardInfo.classList.add('info');

        name.textContent = member.name;
        address.innerHTML = `<strong>Address:</strong> ${member.address}`;
        phone.innerHTML = `<strong>Phone:</strong> ${member.phone}`;
        website.innerHTML = `<strong>URL:</strong> ${member.websiteurl}`;
        level.innerHTML = `${membershipNames[member.membershiplevel]} Member`;

        image.setAttribute('src', member.imageurl);
        image.setAttribute('alt', `Logo of ${member.name}`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', "140");
        image.setAttribute('height', "auto");


        card.appendChild(name);
        card.appendChild(level);
        card.appendChild(cardContent);
        cardContent.appendChild(image);
        cardContent.appendChild(cardInfo);
        cardInfo.appendChild(address);
        cardInfo.appendChild(phone);
        cardInfo.appendChild(website);

        spotlights.appendChild(card);
    });
}

apiFetch();
fetchForecast();