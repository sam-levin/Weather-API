// when the button is clicked
// api is called
// new weather thing is created
var weatherBlockContainer = $("#weatherBlockContainer")
var inputCity = "Penisville, WA"
var historyListEl = $("#history")
var historyList = [];
var deleteEl = $("#delete")

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

var createHistory = function(inputCity) {
    var newListItem = $("<li>").text(inputCity).addClass("history-city")
    historyListEl.append(newListItem);
    // this next line keeps pushing to the thing
    saveHistory();
}

var deleteHistory = function() {
    historyList = [];
    $(".history-city").remove();
    saveHistory();
}

var createHistoryFromStorage = function() {
    if (!historyList) {
    } else {
        for (i = 0; i < historyList.length; i++) {
            createHistory(historyList[i])
        }

    }
}


// this function should take the input day and use the API to return the temp and weather icon
var createWeather = function(inputDay) {
    var iconAndTemp = $("<div>").addClass("d-flex align-items-center flex-column")
    var weatherIcon = $("<span>")
    // this following line will need to be a if statement depending on the weather itself
    weatherIcon.addClass("oi oi-plus pb-3 pt-3")
    var tempText = $("<h5>").text("69°").addClass("text-center save-button");
    iconAndTemp.append(weatherIcon, tempText)
    return (iconAndTemp)
}

/*var createSaveBtn = function() {
    var iconAndText = $("<div>").addClass("d-flex col-2 align-items-center justify-content-center flex-column")
    var saveButton = $("<span>")
    // this following line will need to be a if statement depending on the weather itself
    saveButton.addClass("oi oi-circle-check pb-3 pt-3") 
    var TextText = $("<h6>").text("Save to Favorites").addClass("text-center");
    iconAndText.append(saveButton, TextText)
    return (iconAndText)
}*/

var createCurrentWeatherReport = function(inputCity) {
    var currentAqi = 200 // this needs to change to a JSON element
    var weatherBlock = $("<div>").addClass("weather-block justify-content-between p-1 m-2 ");
    var location = $("<h3>").text(inputCity);
    var currentTemp = $("<h5>").text("The temperature at " + inputCity + " is 69°").addClass()
    var aqiEl = $("<h5>").text("AQI:" + currentAqi).addClass("aqi-element")
    if (currentAqi < 50) {
        aqiEl.addClass("low-aqi")
    } else if (currentAqi >=50 && currentAqi <=150){
        aqiEl.addClass("medium-aqi")
    } else {
        aqiEl.addClass("high-aqi")
    }
    // there should probably be a create weather function that spits out a div with icon, and temp
    weatherBlock.append(location, currentTemp, aqiEl)    
    weatherBlockContainer.append(weatherBlock)
}

var createForecast = function(inputCity) {
    let forecastText = $("<h5>").text("5 Day Forecast for "+ inputCity + ":").addClass("col-12")
    var weatherBlock = $("<div>").addClass("weather-block justify-content-between p-1 m-2 row");
    var weather = $("<div>").addClass("col-12 row justify-content-around");
    var day1weather = createWeather();
    var day2weather = createWeather();
    var day3weather = createWeather();
    var day4weather = createWeather();
    var day5weather = createWeather();
    weather.append(  day1weather, day2weather, day3weather, day4weather, day5weather)
    weatherBlock.append(forecastText, weather)
    weatherBlockContainer.append( weatherBlock)
}

// this clears the existing blocks of weather from the main page
var clearExistingWeather = function() {
    var existWeatherBlock = $(".weather-block");
    existWeatherBlock.remove();
}

loadHistory();
createHistoryFromStorage();

$(deleteEl).on("click", function() {
    deleteHistory();
})

// When the submit button is clicked, it will clear the existing blocks and create todays + forecasts for the searched city
$("#city-finder").on("click", "button",function(event){
    event.preventDefault();
    var inputCity = $("#city-input").val()
    if (inputCity == "") {
        window.alert("Please type in a city name or choose from one of your past searches")
    } else {
        clearExistingWeather();
        createCurrentWeatherReport(inputCity);
        createForecast(inputCity);
        createHistory(inputCity)
        historyList.push(inputCity)
        saveHistory();    
    }
})

// when one of the list items in the favorites is clicked, it will show that city's weather report and forecast
$("#history").on("click", "li", function() {
    clearExistingWeather();
    var clickedCity = $(this).text();
    createCurrentWeatherReport(clickedCity)
    createForecast(clickedCity)
})

