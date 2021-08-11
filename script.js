const apikey = '4f0c5f237b428cfe861db9dc06e5875a';
const url = (location) => `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), {origin:"cors"});
    const respData = await resp.json();

    console.log(respData)

    addWeatherToPage(respData);
}

function addWeatherToPage(data) {
    const temp = KtoCtoF(data.main.temp);
    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
    <h2>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
    ${temp}°F 
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
    </h2>
    <small>${data.weather[0].main}</small>`

    //cleanup
    main.innerHTML = "";

    main.appendChild(weather);
}

function KtoCtoF(K) {
    return ((K - 273.15) * 9 / 5 + 32).toFixed(2);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = search.value;

    if(city) {
        getWeatherByLocation(city);
    }
})