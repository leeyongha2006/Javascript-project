const weatherApi = {
    key: "828cc99e0335c9476a8f751b7c386d9a",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
};

const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
let dat, lat, long;

window.addEventListener('load', () => {
    fetch(weatherApi.baseUrl)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        const { temp } = data.main;
        const place = data.name;
        const { description } = data.weather[0];
        const fahrenheit = (temp * 9) / 532;
        
        // Interacting with DOM to show data
        loc.textContent = `${place}`;
        desc.textContent = `${description}`;
        tempC.textContent = `${temp.toFixed(2)} °C`;
        // tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
        showWeatherImage(desc);
    });
});

const searchInputBox = document.getElementById('input-box');
searchInputBox.addEventListener('keypress', async (event) => {
    if (event.keyCode === 13) {
        console.log(searchInputBox.value);
        await getWeatherReport(searchInputBox.value);
    }
    document.querySelector('.weather-body').style.display = "block";
});

async function getWeatherReport(city) {
    try {
        const response = await fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error('Error while getting the weather report');
        }
        showWeatherReport(data);
        lat = data.coord.lat;
        long = data.coord.lon;
        await fetching();
    } catch (err) {
        console.error(err);
        showErrorMessage();
    }
}

function showErrorMessage() {
    document.getElementById('city').innerText = 'Country/City Name Not Found';
    // clear previous output
    document.getElementById('date').innerText = document.getElementById('temp').innerText = '';
    document.getElementById('min-max').innerText = "";
    document.getElementById('weather').innerText = "";
}

function showWeatherImage(WeatherType) {
    if (WeatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('clear1.jpg')";
    } else if (WeatherType.textContent == 'Clouds' || WeatherType.textContent == 'Haze') {
        document.body.style.backgroundImage = "url('clouds.jpg')";
    } else if (WeatherType.textContent == 'Rain') {
        document.body.style.backgroundImage = "url('rain.jpg')";
    } else if (WeatherType.textContent == 'Snow') {
        document.body.style.backgroundImage = "url('snow.jpg')";
    } else if (WeatherType.textContent == 'Thunderstorm') {
        document.body.style.backgroundImage = "url('thunder.jpg')";
    } else if (WeatherType.textContent == 'Sunny') {
        // For future use
    }
}

function showWeatherReport(weather) {
    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;
    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;
    let WeatherType = document.getElementById('weather');
    WeatherType.innerText = `${weather.weather[0].main}`;
    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);
    showWeatherImage(WeatherType);
}

function dateManage(dateArg) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const year = dateArg.getFullYear();
    const month = months[dateArg.getMonth()];
    const date = dateArg.getDate();
    const day = days[dateArg.getDay()];
    return `${date} ${month} (${day}), ${year}`;
}

async function fetching() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${weatherApi.key}&units=metric`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error('Error while fetching the weather');
        }
        dat = data;
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);
    } catch (err) {
        console.error(err);
    }
}

function drawChart() {
    const unixTimes = dat.hourly.map(hourData => hourData.dt);
    const hourLabels = unixTimes.map(unixTime => format(new Date(unixTime * 1000)));

    const temperatureData = dat.hourly.map(hourData => Math.floor(hourData.temp));

    const data = google.visualization.arrayToDataTable([
        ['Time', 'Temperature', { role: 'style' }],
        ...hourLabels.map((hourLabel, index) => [hourLabel, temperatureData[index], 'color: black'])
    ]);

    const options = {
        title: 'Time vs. Temperature',
        hAxis: { title: 'Time in Hours' },
        vAxis: { title: 'Temperature in °C' },
        legend: 'none',
        tooltip: { isHtml: true },
        backgroundColor: 'transparent',
        color: 'black',
        is3D: true,
        allowHtml: true,
    };

    document.querySelector("#myChart").style.display = "block";
    const chart = new google.visualization.AreaChart(document.getElementById('myChart'));
    chart.draw(data, options);
}

function format(date) {
    let hours = date.getHours();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return hours + ampm;
}

window.onresize = () => {
    drawChart();
};
