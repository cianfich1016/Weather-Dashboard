var APIKey = "04c801176447e332047f2f7bc4868de7";
var searchButton = document.getElementById("searchBtn");


function getCity(event){
    event.preventDefault();

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
            var uvIndex = data.current.uvi;
            
            uv.textContent = "UV Index: " + uvIndex;

            
            for (var i=0; i < 5; i++){
                var futureTemp = document.querySelector(".dayTemp")
                futureTemp.textContent = "Temp: " + data.daily[i].temp.day + "\xB0F";

                var futureWind = document.querySelector(".dayWind")
            }    
            
        })
}; 

searchButton.addEventListener("click", getCity);

