//Generated API key from Open Weather Map
var APIKey = "04c801176447e332047f2f7bc4868de7";
var searchButton = document.getElementById("searchBtn");
var jumbotron = document.querySelector(".jumbotron");
var fiveDay = document.querySelector("h3");
var uvInfo = document.querySelector("span");
var mainWeather = document.querySelector(".mainWeather");

//Created array to push names of previous cities searched"
var cities = JSON.parse(localStorage.getItem("cities")) || [];

//On the click of the previous cities searched, the same weather information will display by calling the main getCity(city) function.
document.querySelector(".previousSearch").addEventListener("click", function(e){
    e.preventDefault();
    var city = e.target.textContent;
    getCity(city);
})
//Created buttons for each previous city searched.
if(cities.length){
    for(var i=0; i < cities.length; i++){
        var cityEl = document.createElement("button");
        cityEl.textContent = cities[i];
        document.querySelector(".previousSearch").appendChild(cityEl);
    }
}
//Function to get city name from user input.
function getCity(city){
    
    jumbotron.style.display = "block";

    //Add city to array and container of previously chosen cities.
    cities.push(city)
    localStorage.setItem("cities", JSON.stringify(cities));

    var cityEl = document.createElement("button");
        cityEl.textContent = city;
        document.querySelector(".previousSearch").appendChild(cityEl);

    //User typed city.    
    var chosenCity = document.querySelector(".display-4"); 
    
    //Get current date.
    var date = moment().format("l"); 
    
    //First API URL using the city name to get latitude and longitude coordinates.
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=04c801176447e332047f2f7bc4868de7";
  
    fetch(queryURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
        
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        
        //Used latitude and longitude data from first call to create a second URL and actually locate city to get weather.
        var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=04c801176447e332047f2f7bc4868de7"

        chosenCity.textContent = city + " (" + date + ")";

        getWeather(queryURL2);

    });
};

function getWeather(queryURL2){
        //Second API call
        fetch(queryURL2)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
            //Create main display of current weather using returned data from API.
            mainWeather.style.display = "block";

            var temp = document.querySelector(".lead1");
            temp.textContent = "Temp: " + data.current.temp + "\xB0F";

            var wind = document.querySelector(".lead2");
            wind.textContent = "Wind: " + data.current.wind_speed + " MPH";

            var humidity = document.querySelector(".lead3");
            humidity.textContent = "Humidity: " + data.current.humidity + "%";
            
            //Created uv index adding a span tag to allow for different color badges to show based on uv index number.
            //var uv = document.querySelector(".lead4");
            var uvIndex = document.querySelector("span")
            uvIndex.textContent = data.current.uvi;
            console.log(uvIndex.textContent)

            if (uvIndex.textContent >= 3 && uvIndex.textContent <= 7.99){
                uvIndex.setAttribute("class", " badge badge-warning")
            } else if(uvIndex.textContent >= 8 && uvIndex.textContent <= 10.99){
                uvIndex.setAttribute("class", "badge badge-danger")
            } else if(uvIndex.textContent >= 11){
                uvIndex.setAttribute("class", "badge badge-dark");
            };
        
            
            fiveDay.style.display = "block";

            //Loop through daily data to retrieve information for future forecast.
            for (var i=0; i<5; i++){
                var forecastEL = document.querySelector("#futureWeather");
                var futureForecast = document.createElement("ul");
                var futureDate = document.createElement("li");
                var futureImage = document.createElement("img");
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
                futureDate.textContent = moment().add(i+1, "days").format("l");

                //Linked image for icons from API website and daily data.
                var linkImage = data.daily[i].weather[0].icon;
                futureImage.setAttribute("src", "https://openweathermap.org/img/wn/" + linkImage + "@2x.png")
            
                futureTemp.textContent = "Temp: " + data.daily[i].temp.day + "\xB0F";
                futureWind.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
                futureHumidity.textContent = "Humidity: " + data.daily[i].humidity + "%";

                forecastEL.replaceChild(futureForecast, forecastEL.childNodes[i])  

            }    

            
            
        });
         
}; 

//Click of button event listener to start function once city is typed by user.
searchButton.addEventListener("click", function(e){
    e.preventDefault();
    var city = document.getElementById("inputCity").value;
    getCity(city)
    
});


