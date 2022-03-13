// when the button is clicked
// api is called
// new weather thing is created
var weatherBlockContainer = $("#weatherBlockContainer")
var inputCity = "Penisville, WA"

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

var createSaveBtn = function() {
    var iconAndText = $("<div>").addClass("d-flex col-2 align-items-center justify-content-center flex-column")
    var saveButton = $("<span>")
    // this following line will need to be a if statement depending on the weather itself
    saveButton.addClass("oi oi-circle-check pb-3 pt-3") 
    var TextText = $("<h6>").text("Save to Favorites").addClass("text-center");
    iconAndText.append(saveButton, TextText)
    return (iconAndText)
}

var createWeatherReport = function(inputCity) {
    var weatherBlock = $("<div>").addClass("weather-block justify-content-between p-1 m-2 row");
    var location = $("<div>").addClass("col-2");
    // there should probably be a create weather function that spits out a div with icon, and temp
    location.append(inputCity)
    weatherBlock.append(location)    
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
    weatherBlock.append(weather)
    weatherBlockContainer.append(forecastText, weatherBlock)
}


$("#city-finder").on("click", "button",function(event){
    event.preventDefault();
    var inputCity = $("#city-input").val()
    createWeatherReport(inputCity);
})

createWeatherReport(inputCity);
createForecast(inputCity)