$(document).ready(function() {});
function forecastFive(city) {
	var APIKey = 'f33edbda95e6349a1022bdc669ee8886';
	var queryURL =
		'https://api.openweathermap.org/data/2.5/forecast?q=' +
		city +
		',us&units=imperial' +
		'&appid=' +
		APIKey;

	$.ajax({
		url: queryURL,
		method: 'GET',
		dataType: 'json'
	}).then(function(data) {
		for (i = 0; i < data.list.length; i++) {
			var checker = data.list[i].dt_text.indexOf('12:00:00');
			if (checker === 11) {
				console.log(data.list[i].dt_txt);
			}
		}
		console.log(data);
	});

	// 	//Need to add to add classes to html
	// 	$('.city').html('<h1>' + response.name + ' Weather Details</h1>');
	// 	$('.wind').text('Wind Speed: ' + response.wind.speed);
	// 	$('.humidity').text('Humidity: ' + response.main.humidity);
	// 	$('.temp').text('Temperature (F) ' + response.main.temp);

	// 	console.log(response);
	// }
	// // Questions
	// //where do I put this click event? Both in html and js?
	// $(".fa").click(function () {
	// forecastFive('Baltimore');

	// var date = moment().format('L');
	// var city;
	// var cities = [];
	// var cityLocStore = JSON.parse(localStorage.getItem('cities')) || cities;
	// var APIKey = 'f33edbda95e6349a1022bdc669ee8886';

	//Create a function to pull weather information from the weather API
	// function currentWeather() {
	// 	fiveDayForcast(city);
	// 	//Pull Current Weather for searched City
	// 	var queryURL =
	// 		'https://api.openweathermap.org/data/2.5/weather?q=' +
	// 		city +
	// 		'&appid=' +
	// 		APIKey;

	$.ajax({
		url: queryURL,
		method: 'GET'
	})

		.then(function(response) {
			console.log(response);

			$('.city-name').html(response.name + ' (' + date + ') ');
			$('.weather-display').attr(
				'src',
				'http://openweathermap.org/img/wn/' +
					response.weather[0].icon +
					'@2x.png'
			);
			$('.temp').html(
				'Temperature: ' +
					((response.main.temp - 273.15) * 1.8 + 32).toFixed(2) +
					'&#176;F'
			);
			$('.humidity').text('Humidity: ' + response.main.humidity + '%');
			$('.wind').html('Wind Speed: ' + response.wind.speed + ' MPH');

			var uvLat = response.coord.lat;
			var uvLon = response.coord.lon;

			uvIndex(uvLat, uvLon);
		})
		.catch((e) => alert('Error: Please try another city'));
}

// 5-Day Forecast
function fiveDayForcast(city) {
	var queryURLFive =
		'https://api.openweathermap.org/data/2.5/forecast?q=' +
		city +
		'&appid=' +
		APIKey;

	var dateArray = [];
	var iconArray = [];
	var tempArray = [];
	var humidityArray = [];

	$.ajax({
		url: queryURLFive,
		method: 'GET'
	}).then(function(response) {
		console.log(response);

		for (var i = 0; i < 40; i++) {
			var option = response.list[i].dt_txt.substring(11);
			var dateValue = response.list[i].dt_txt.substring(0, 10);
			var currentDate = moment().format('YYYY-MM-DD');

			if ('15:00:00' == option && dateValue != currentDate) {
				//Convert the date using moment (I think	) js
				var dateString = response.list[i].dt_txt.substring(0, 10);
				var date = new moment(dateString);

				var formatDate = date.format('MM/DD/YYYY');
				console.log(
					'Get here - script.js - line 72. Date Format: ' + formatDate
				);

				dateArray.push(formatDate);

				//Icon
				iconArray.push(response.list[i].weather[0].icon);

				//Convert to farenheit (sp)
				tempArray.push(
					((response.list[i].main.temp - 273.15) * 1.8 + 32).toFixed(2)
				);

				//Humidity
				humidityArray.push(response.list[i].main.humidity);
			}
		}

		for (var i = 0; i < dateArray.length; i++) {
			$('.forecast' + [i]).empty();
		}

		//Append
		for (var i = 0; i < dateArray.length; i++) {
			//Append Date
			var newDate = $('<h4>').text(dateArray[i]);
			$('.forecast' + [i]).append(newDate);

			//Append Icon
			var newImg = $('<img>');
			newImg.attr(
				'src',
				'http://openweathermap.org/img/wn/' + iconArray[i] + '@2x.png'
			);
			$('.forecast' + [i]).append(newImg);

			//Append Tempurature
			var newTemp = $('<p>').html('Temp: ' + tempArray[i] + '&#176;F');
			$('.forecast' + [i]).append(newTemp);

			//Addend Humidity
			var newHumidity = $('<p>').html('Humidity: ' + humidityArray[i] + '%');
			$('.forecast' + [i]).append(newHumidity);

			console.log('Get here - script.js - line 113');
		}
	});
}

//Clear previous city I don't even know
function clearingButton() {
	$('#buttons-view').empty();

	for (var i = 0; i < cityLocStore.length; i++) {
		var a = $('<button>');
		a.addClass('btn city big-btn');
		a.attr('data-name', cityLocStore[i]);
		a.text(cityLocStore[i]);
		$('#buttons-view').append(a);
	}
	console.log('Get here - script.js - line 129');
}

// Search Button/Add City Button
$('#add-city').on('click', function(event) {
	event.preventDefault();
	var cityInput = $('#city-input')
		.val()
		.trim();

	var queryURL =
		'https://api.openweathermap.org/data/2.5/weather?q=' +
		cityInput +
		'&appid=' +
		APIKey;

	$.ajax({
		url: queryURL,
		method: 'GET'
	})

		.then(function(response) {
			cityLocStore.push(cityInput);
			localStorage.setItem('cities', JSON.stringify(cityLocStore));
			clearingButton();
			city = cityInput;
			$('#city-input, textarea').val('');
			currentWeather();
		})

		.catch((e) => alert('Error: Please try another city'));
	console.log('Get here - script.js - line 159');
});

//UV Index?
function uvIndex(uvLat, uvLon) {
	var queryURLUV =
		'https://api.openweathermap.org/data/2.5/uvi?appid=' +
		APIKey +
		'&lat=' +
		uvLat +
		'&lon=' +
		uvLon;

	$.ajax({
		url: queryURLUV,
		method: 'GET'
	}).then(function(response) {
		console.log(response);
		console.log('Get here - script.js - line 172');

		var uvIndexResults = response.value;
		var uvIndexButton = $('<span>').text(response.value);

		$('.uv-index').text('UV Index: ');
		$('.uv-index').append(uvIndexButton);

		if (response.value < 3.0) {
			uvIndexButton.attr('class', 'green-uv');
		} else if (response.value >= 3.0 && response.value < 6.0) {
			uvIndexButton.attr('class', 'yellow-uv');
		} else if (response.value >= 6.0 && response.value < 8.0) {
			uvIndexButton.attr('class', 'orange-uv');
		} else if (response.value >= 8.0 && response.value < 11.0) {
			uvIndexButton.attr('class', 'red-uv');
		} else if (response.value >= 11.0) {
			uvIndexButton.attr('class', 'purple-uv');
		}
	});
	console.log('Get here - script.js - line 196');
}

//On Click for Add City Button
$(document).on('click', '.city', function() {
	city = $(this).attr('data-name');
	currentWeather();
	console.log('Get here - script.js - line 203');
});
