// when the button is clicked
// api is called
// new weather thing is created
var weatherBlockContainer = $("#weatherBlockContainer")
var inputCity = "Penisville, WA"
var historyListEl = $("#history")
var historyList = [];
var deleteEl = $("#delete")
var apiKey = "9212855ef4411938de31c8ee9c5670a9"

// this function saves the current history list
var saveHistory = function() {
    localStorage.setItem("history", JSON.stringify(historyList));
}

 var loadHistory = function() {
    storedHistoryList = JSON.parse(localStorage.getItem("history"))
    if (!storedHistoryList) {
        historyList = []
    } else {
        historyList = storedHistoryList    
    }
    return(historyList)
}

// this creates a new list item to be put into the history list
var createHistory = function(inputCity) {
    var newListItem = $("<li>").text(inputCity).addClass("history-city text-capitalize")
    historyListEl.append(newListItem);
    // this next line keeps pushing to the thing
    saveHistory();
}

// this deletes all the elements with the class history-city
var deleteHistory = function() {
    historyList = [];
    $(".history-city").remove();
    saveHistory();
}

// this creates a new history list from the items in storage
var createHistoryFromStorage = function() {
    if (!historyList) {
    } else {
        for (i = 0; i < historyList.length; i++) {
            createHistory(historyList[i])
        }

    }
}

// this function should take the input day and use the API to return the temp and weather icon
var createWeather = function(data, inputDay) {
    var iconAndTemp = $("<div>").addClass("d-flex align-items-center flex-column")
    var currentIcon = data.daily[inputDay].weather[0].icon
    var dayTemp = data.daily[inputDay].temp.day;
    var nightTemp = data.daily[inputDay].temp.night;
    var description = $("<h4>").text(data.daily[inputDay].weather[0].description).addClass("text-capitalize");
    var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/"+ currentIcon +"@2x.png" ) 
    // this following line will need to be a if statement depending on the weather itself
    var descriptionText = $("<h6>").text(description).addClass("text-center save-button");
    var dayText = $("<h6>").text("Day: "+dayTemp+"°").addClass("text-center save-button");
    var nightText = $("<h6>").text("Night: "+nightTemp+"°").addClass("text-center save-button");
    iconAndTemp.append(icon, description, dayText, nightText)
    return (iconAndTemp)
}

// this creates the current weather report 
var createCurrentWeatherReport = function(inputCity, data) {
    var currentUvi = data.current.uvi 
    var currentTemp = data.current.temp
    var currentIcon = data.current.weather[0].icon
    var weatherBlock = $("<div>").addClass("weather-block justify-content-between p-1 m-2 ");
    var location = $("<h3>").text(inputCity).addClass("text-capitalize");
    var description = $("<h4>").text(data.current.weather[0].description).addClass("text-capitalize");
    var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/"+ currentIcon +"@2x.png" ) 
    var currentTempEl = $("<h5>").text("The temperature in " + inputCity + " is currently "+ currentTemp +"° Fahrenheit").addClass()
    var uviEl = $("<h5>").text("UV Index:" + currentUvi).addClass("aqi-element")
    // this is the if chain for the uv index that changes the color
    if (currentUvi < 3) {
        uviEl.addClass("low-aqi")
    } else if (currentUvi >=3 && currentUvi <=5){
        uviEl.addClass("medium-aqi")
    } else {
        uviEl.addClass("high-aqi")
    }
    // this line appends the data to the actual block
    weatherBlock.append(location, icon, description, currentTempEl, uviEl).addClass("pl-3")    
    weatherBlockContainer.append(weatherBlock)
}

// this creates the 5 day forecast block
var createForecast = function(inputCity, data) {
    let forecastText = $("<h5>").text("5 Day Forecast for "+ inputCity + ":").addClass("col-12")
    var weatherBlock = $("<div>").addClass("weather-block justify-content-between p-1 m-2 row");
    var weather = $("<div>").addClass("col-12 row justify-content-around");
    var day1weather = createWeather(data,1);
    var day2weather = createWeather(data,2);
    var day3weather = createWeather(data,3);
    var day4weather = createWeather(data,4);
    var day5weather = createWeather(data,5);
    weather.append(day1weather, day2weather, day3weather, day4weather, day5weather)
    weatherBlock.append(forecastText, weather)
    weatherBlockContainer.append(weatherBlock)
}

// this clears the existing blocks of weather from the main page
var clearExistingWeather = function() {
    var existWeatherBlock = $(".weather-block");
    existWeatherBlock.remove();
}

// this gets the data from the input coordinates and creates the weather report
var createDataFromCoord = function(inputCoord, inputCity) {
    var lat = inputCoord[0]
    var long = inputCoord[1]
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+long+"&units=imperial&appid="+ apiKey + ""
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data){
            console.log(data)
            clearExistingWeather();
            createCurrentWeatherReport(inputCity, data);
            createForecast(inputCity, data);
            createHistory(inputCity)
            historyList.push(inputCity)
            saveHistory(); 
        })
    })
}

// this functin actually gets
var getWeatherData = function(inputCity) {
    var inputCityTrim = inputCity.trim();
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ inputCityTrim +"&appid="+ apiKey +""
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data){
            var coordArray = []
            console.log(data)
            coordArray.push(data.coord.lat)
            coordArray.push(data.coord.lon)
            createDataFromCoord(coordArray, inputCity);
        });
    });
    
}

loadHistory();
createHistoryFromStorage();

// when the delete history is clicked, the delete history function is ran
$(deleteEl).on("click", function() {
    deleteHistory();
})

// When the submit button is clicked, it will clear the existing blocks and create todays + forecasts for the searched city
$("#city-finder").on("click", "button",function(event){
    event.preventDefault();
    var inputCity = $("#city-input").val()
    $("#city-input").val() == ""
    if (inputCity == "") {
        window.alert("Please type in a city name or choose from one of your past searches")
    } else {
        getWeatherData(inputCity)
    }
})

// when one of the list items in the favorites is clicked, it will show that city's weather report and forecast
$("#history").on("click", "li", function() {
    clearExistingWeather();
    var clickedCity = $(this).text();
    getWeatherData(clickedCity)
});
