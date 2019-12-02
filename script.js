$(document).ready(function() {});
var APIKey = 'f33edbda95e6349a1022bdc669ee8886';
var queryURL =
	'https://samples.openweathermap.org/data/2.5/weather?' +
	'q=London&units=imperial&appid=' +
	APIKey;
//console.log keeps stating a type error: $.ajax is not a function. Double triple checked and synatax is correct. Am I missing a script somewhere on the html?
$.ajax({
	url: queryURL,
	method: 'GET'
});

//Need to add to add classes to html
$('.city').html('<h1>' + response.name + ' Weather Details</h1>');
$('.wind').text('Wind Speed: ' + response.wind.speed);
$('.humidity').text('Humidity: ' + response.main.humidity);
$('.temp').text('Temperature (F) ' + response.main.temp);

console.log('Wind Speed: ' + response.wind.speed);

// Questions
//where do I put this click event? Both in html and js?
// $(".fa").click(function () {
