const APIKey = "1cf3b6b2378dbd633c0e3d2ef94acefc";
let buttonDiv = $(".button-div")
let cityButtonArr = []

loadData();

//function to clear out text before appending new data
function reloadData() {
  $("#city-title").empty();
  $("#temperature").empty();
  $("#wind-speed").empty();
};
//function to clear out the forecast before appending new data
function clearForecastBoxes() {
  for (i = 1; i < 6; i++) {
    $("#date" + i).empty();
  };
};

$("#form").on('submit', function (e) {
  e.preventDefault();

  let city = $("#city-input").val()
  let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    reloadData();

      let longitude = response.coord.lon
      let latitude = response.coord.lat
      let icon = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;

    $('#icon').html(`<img src="${icon}">`);
    $('#icon').attr("class", "icon")
    $("#city-title").empty()
    $("#city-title").append(response.name)
    $(".city").attr("style", "font-weight: bold; font-size: 30px")
    $("#wind-speed").empty()
    $("#wind-speed").append("Wind speed: " + response.wind.speed + " MPH")
    $("#temperature").empty()
    $("#temperature").append("Temperature: " + response.main.temp_max + "°")


          forecastData();

    function forecastData() {
      var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}35&lon=${longitude}&units=metric&APPID=${APIKey}`
      $.ajax({
        url: forecastUrl,
        method: "GET"
      }).then(function (response) {
        console.log("forecast response")
        console.log(response)

        clearForecastBoxes();

        $("#date1").append(response.list[7].dt_txt.slice(5, 10))
        $('#date1').append("<br>")
        var icon = `http://openweathermap.org/img/wn/${response.list[7].weather[0].icon}@2x.png`
        $('#date1').append(`<img src="${icon}">`);
        $('#date1').attr("style", "font-size: 10px; text-align: center;")
        $('#date1').append("Temperature: " + response.list[7].main.temp + "°")
        $('#date1').append("<br>")
        $('#date1').append("Humidity: " + response.list[7].main.humidity + "%")

        $("#date2").append(response.list[15].dt_txt.slice(5, 10))
        $('#date2').append("<br>")
        var icon = `http://openweathermap.org/img/wn/${response.list[15].weather[0].icon}@2x.png`
        $('#date2').append(`<img src="${icon}">`);
        $('#date2').attr("style", "font-size: 10px; text-align: center;")
        $('#date2').append("Temperature: " + response.list[15].main.temp + "°")
        $('#date2').append("<br>")
        $('#date2').append("Humidity: " + response.list[15].main.humidity + "%")

        $("#date3").append(response.list[23].dt_txt.slice(5, 10))
        $('#date3').append("<br>")
        var icon = `http://openweathermap.org/img/wn/${response.list[23].weather[0].icon}@2x.png`
        $('#date3').append(`<img src="${icon}">`);
        $('#date3').attr("style", "font-size: 10px; text-align: center;")
        $('#date3').append("Temperature: " + response.list[23].main.temp + "°")
        $('#date3').append("<br>")
        $('#date3').append("Humidity: " + response.list[23].main.humidity + "%")

        $("#date4").append(response.list[31].dt_txt.slice(5, 10))
        $('#date4').append("<br>")
        var icon = `http://openweathermap.org/img/wn/${response.list[31].weather[0].icon}@2x.png`
        $('#date4').append(`<img src="${icon}">`);
        $('#date4').attr("style", "font-size: 10px; text-align: center;")
        $('#date4').append("Temperature: " + response.list[31].main.temp + "°")
        $('#date4').append("<br>")
        $('#date4').append("Humidity: " + response.list[31].main.humidity + "%")

        $("#date5").append(response.list[39].dt_txt.slice(5, 10))
        $('#date5').append("<br>")
        var icon = `http://openweathermap.org/img/wn/${response.list[39].weather[0].icon}@2x.png`
        $('#date5').append(`<img src="${icon}">`);
        $('#date5').attr("style", "font-size: 10px; text-align: center;")
        $('#date5').append("Temperature: " + response.list[39].main.temp + "°")
        $('#date5').append("<br>")
        $('#date5').append("Humidity: " + response.list[39].main.humidity + "%")
      })
    }

    generateButton();
    clearForm();

    function generateButton() {
      var create = $("<button>")
      create.attr("class", "btn btn-outline-secondary")
      create.attr("type", "button")
      create.text(response.name)
      buttonDiv.prepend(create)
      var cityString = response.name
      cityButtonArr.push(cityString.toString())
      localStorage.setItem("cityStorage", JSON.stringify(cityButtonArr))
    };
  })
});

function loadData() {
  var loadData = localStorage.getItem("cityStorage")
  if (loadData == null || loadData == "") {
    return;
  }
  cityButtonArr = JSON.parse(loadData)
  for (i = 0; i < cityButtonArr.length; i++) {
    var create = $("<button>")
    create.attr("class", "btn btn-outline-secondary")

    create.text(cityButtonArr[i])
    buttonDiv.prepend(create)
  };
};

$(".btn").on('click', function () {
  city = $(this).text()
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    reloadData();
    $("#city-title").append(response.name)
    $(".city").attr("style", "font-weight: bold; font-size: 30px")
    $("#wind-speed").append("Wind speed: " + response.wind.speed + " MPH")
    $("#temperature").append("Temperature: " + response.main.temp + "°")

    var longitude = response.coord.lon
    var latitude = response.coord.lat

    forecastData();

    function forecastData() {
      var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}35&lon=${longitude}&units=metric&APPID=${APIKey}`
      $.ajax({
        url: forecastUrl,
        method: "GET"
      }).then(function (response) {
        console.log("forecast response")
        console.log(response)

        clearForecastBoxes();

        $("#date1").append(response.list[7].dt_txt.slice(5, 10))
        $('#date1').append("<br>")
        var icon = `http://openweathermap.org/img/wn/${response.list[7].weather[0].icon}@2x.png`
        $('#date1').append(`<img src="${icon}">`);
        $('#date1').attr("style", "font-size: 10px; text-align: center;")
        $('#date1').append("Temperature: " + response.list[7].main.temp + "°")
        $('#date1').append("<br>")
        $('#date1').append("Humidity: " + response.list[7].main.humidity + "%")

        $("#date2").append(response.list[15].dt_txt.slice(5, 10))
        $('#date2').append("<br>")
        var icon = `http://openweathermap.org/img/wn/${response.list[15].weather[0].icon}@2x.png`
        $('#date2').append(`<img src="${icon}">`);
        $('#date2').attr("style", "font-size: 10px; text-align: center;")
        $('#date2').append("Temperature: " + response.list[15].main.temp + "°")
        $('#date2').append("<br>")
        $('#date2').append("Humidity: " + response.list[15].main.humidity + "%")

        $("#date3").append(response.list[23].dt_txt.slice(5, 10))
        $('#date3').append("<br>")
        var icon = `http://openweathermap.org/img/wn/${response.list[23].weather[0].icon}@2x.png`
        $('#date3').append(`<img src="${icon}">`);
        $('#date3').attr("style", "font-size: 10px; text-align: center;")
        $('#date3').append("Temperature: " + response.list[23].main.temp + "°")
        $('#date3').append("<br>")
        $('#date3').append("Humidity: " + response.list[23].main.humidity + "%")

        $("#date4").append(response.list[31].dt_txt.slice(5, 10))
        $('#date4').append("<br>")
        var icon = `http://openweathermap.org/img/wn/${response.list[31].weather[0].icon}@2x.png`
        $('#date4').append(`<img src="${icon}">`);
        $('#date4').attr("style", "font-size: 10px; text-align: center;")
        $('#date4').append("Temperature: " + response.list[31].main.temp + "°")
        $('#date4').append("<br>")
        $('#date4').append("Humidity: " + response.list[31].main.humidity + "%")

        $("#date5").append(response.list[39].dt_txt.slice(5, 10))
        $('#date5').append("<br>")
        var icon = `http://openweathermap.org/img/wn/${response.list[39].weather[0].icon}@2x.png`
        $('#date5').append(`<img src="${icon}">`);
        $('#date5').attr("style", "font-size: 10px; text-align: center;")
        $('#date5').append("Temperature: " + response.list[39].main.temp + "°")
        $('#date5').append("<br>")
        $('#date5').append("Humidity: " + response.list[39].main.humidity + "%")
      })
    }
      })
    }
  );

function clearForm() {
  $("form").trigger('reset');
}
