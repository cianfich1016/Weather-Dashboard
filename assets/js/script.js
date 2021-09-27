var APIKey = "04c801176447e332047f2f7bc4868de7";
var searchButton = document.getElementById("searchBtn");


function getCity(event){
    event.preventDefault();
    var city = document.getElementById("inputCity").value;
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=04c801176447e332047f2f7bc4868de7";

    var chosenCity = document.querySelector(".display-4"); 
    var date = moment().format("L"); 
    chosenCity.textContent = city + " (" + date + ")";

    getCoord(queryURL)
};
    
function getCoord(queryURL){    
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

function getWeather(queryURL2){
        fetch(queryURL2)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
            console.log(data);
            
            })
        
        };
    }; 


searchButton.addEventListener("click", getCity);

