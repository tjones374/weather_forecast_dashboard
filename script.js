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

	//Need to add to add classes to html
	// $('.city').html('<h1>' + response.name + ' Weather Details</h1>');
	// $('.wind').text('Wind Speed: ' + response.wind.speed);
	// $('.humidity').text('Humidity: ' + response.main.humidity);
	// $('.temp').text('Temperature (F) ' + response.main.temp);

	// console.log(response);
}
// Questions
//where do I put this click event? Both in html and js?
// $(".fa").click(function () {
forecastFive('Baltimore');
