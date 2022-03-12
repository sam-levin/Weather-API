// when the button is clicked
// api is called
// new weather thing is created
var weatherBlockContainer = $("#weatherBlockContainer")
var inputCity = "Penisville"
var createWeatherReport = function(inputCity) {
    var weatherBlock = $("<div>").addClass("weather-block")
    .text(inputCity);
    weatherBlockContainer.append(weatherBlock)
}

createWeatherReport(inputCity);
