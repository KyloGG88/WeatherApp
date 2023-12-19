const APIKey = "1cf3b6b2378dbd633c0e3d2ef94acefc";
let buttonDiv = $(".button-div")
let cityArr = []


let city = $("#city-input").val()
let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${APIKey}`

fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });