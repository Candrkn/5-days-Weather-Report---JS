const form = document.querySelector("form");
const searchInput = document.querySelector("#searchInput");
const row = document.querySelector(".row");

const apiKey = "955a2d0a6498848dde5def0bbe42af71";

// ! Hava durumuna gore arkaplan rengi;
const weatherColors = {
    Clear : "#f1c40f",
    Clouds : "#3498db",
    Rain : "#2ecc71",
    Snow : "#ecf0f1",
    Mist : "#95a5a6",
    Thunderstorm : "#8e44ad",
    Drizzle : "#d35400",
}

form.addEventListener("submit",function(e){
    e.preventDefault();

    let city = searchInput.value;

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        const cityName = data.city.name;
        const countryName = data.city.country;

        const forecasts = data.list.filter(function(forecast){
            return forecast.dt_txt.includes("12:00:00");
        });
        console.log(forecasts);

        row.innerHTML="";

        forecasts.forEach(function(veri){
            // console.log(veri);

            // ! Hava durumuna gore iconlari getirmek icin;

            const weatherIconUrl = `https://openweathermap.org/img/wn/${veri.weather[0].icon}.png`


            // ! Tarihi düzenlemek için;
            const date = new Date(veri.dt_txt);
            const formattedDate = date.toLocaleDateString("tr-TR",{
                day : "numeric",
                month : "long",
                year : "numeric",
                weekday : "long",
            });

            // ! Havanın tanımını gostermek icin;

            const weatherDescription = (veri.weather[0].description) [0].toUpperCase() + (veri.weather[0].description).slice(1);

            // ! Havanın sıcakligi;

            const weatherTemprature = Math.round(veri.main.temp);

            // ! Hava durumuna gore arka plan;

            const weatherBackgroundColor = weatherColors[veri.weather[0].main]



            row.innerHTML += `
            <div class="col-4">
               <div class="card m-3" style="background-color: ${weatherBackgroundColor}">
               <img src="${weatherIconUrl}" class="weather-icon" alt="Weather Icon">
               <div class="card-body">
               <h5 class="card-title custom-font">${cityName}, ${countryName}</h5>
               <h5 class="card-title">${formattedDate}</h5>
               <p class="card-text">${weatherTemprature}°C</p>
               <p class="card-text">${weatherDescription}</p>
            </div>
        </div>
    </div>
            `
        })
    })
})