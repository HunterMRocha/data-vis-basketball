var players = ["Lebron James", "Stephen Curry", "Derrick Rose"]

var select = d3.select('body')
  .append('select')
  	.attr('class','select')
    .on('change',onchange)

var options = select
  .selectAll('option')
	.data(players).enter()
	.append('option')
		.text(function (d) { return d; });

function onchange() {
	selectValue = d3.select('select').property('value')
	d3.select('body')
		.append('p')
		.text(selectValue + ' is the last selected option.')
};