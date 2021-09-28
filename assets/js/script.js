var APIKey = "04c801176447e332047f2f7bc4868de7";
var searchButton = document.getElementById("searchBtn");
var jumbotron = document.querySelector(".jumbotron");
var fiveDay = document.querySelector("h3");
var uvInfo = document.querySelector("span");

function getCity(event){
    event.preventDefault();

    jumbotron.style.display = "block";
    

    var city = document.getElementById("inputCity").value;
        var chosenCity = document.querySelector(".display-4"); 
        var date = moment().format("l"); 
        chosenCity.textContent = city + " (" + date + ")";
       
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=04c801176447e332047f2f7bc4868de7";
  
    fetch(queryURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
        //console.log(data);
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        //console.log(lat);
        //console.log(lon);
        
        
        var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=04c801176447e332047f2f7bc4868de7"

        getWeather(queryURL2);

    });
};

function getWeather(queryURL2){
        fetch(queryURL2)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
            console.log(data);

            var temp = document.querySelector(".lead1");
            temp.textContent = "Temp: " + data.current.temp + "\xB0F";

            var wind = document.querySelector(".lead2");
            wind.textContent = "Wind: " + data.current.wind_speed + " MPH";

            var humidity = document.querySelector(".lead3");
            humidity.textContent = "Humidity: " + data.current.humidity + "%";

            var uv = document.querySelector(".lead4");
            var uvIndex = document.createElement("span")
            uvIndex = data.current.uvi;
            uv.textContent = uvIndex;

            if (uvIndex >= 3 && uvIndex <= 7.99){
                uv.setAttribute("class", " badge badge-warning")
            } else if(uvIndex >= 8 && uvIndex <= 10.99){
                uv.setAttribute("class", "badge badge-danger")
            } else if(uvIndex >= 11){
                uv.setAttribute("class", "badge badge-dark");
            };
        
            
            fiveDay.style.display = "block";

            
            for (var i=0; i<5; i++){
                var forecastEL = document.querySelector("#futureWeather");
                var futureForecast = document.createElement("ul");
                var futureDate = document.createElement("li");
                var futureImage = document.createElement("li");
                var futureTemp = document.createElement("li");
                var futureWind = document.createElement("li");
                var futureHumidity = document.createElement("li");

                forecastEL.appendChild(futureForecast);
                futureForecast.appendChild(futureDate);
                futureForecast.appendChild(futureImage);
                futureForecast.appendChild(futureTemp);
                futureForecast.appendChild(futureWind);
                futureForecast.appendChild(futureHumidity);

                futureDate.setAttribute("style", "font-size: 20px; font-weight: bold");

                futureImage.setAttribute("src", "http://openweathermap.org/img/wn/10d@2x.png")

                //var linkImage = data.daily[i].weather[0].icon;

                futureDate.textContent = moment().add(1, "days").format("l");
            
                futureTemp.textContent = "Temp: " + data.daily[i].temp.day + "\xB0F";
                futureWind.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
                futureHumidity.textContent = "Humidity: " + data.daily[i].humidity + "%";

            }    
            
        });
}; 

searchButton.addEventListener("click", getCity);

