$(document).ready(function() {});
var APIKey = 'f33edbda95e6349a1022bdc669ee8886';
var queryURL =
	'https://samples.openweathermap.org/data/2.5/weather?' +
	'q=London&units=imperial&appid=' +
	APIKey;

$.ajax({
	url: queryURL,
	method: 'GET'
});

console.log(response);
