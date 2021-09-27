var APIKey = "04c801176447e332047f2f7bc4868de7";


var searchButton = document.getElementById("searchBtn")

function getWeather(event){
    event.preventDefault();
    var city = document.getElementById("inputCity").value;
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=04c801176447e332047f2f7bc4868de7";
    
    fetch(queryURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
        });
    };

searchButton.addEventListener("click", getWeather);