$(document).ready(function(){
	//data is an array
	var data = [];

	$.ajax({
		type: 'GET',
		url: 'http://api.openweathermap.org/data/2.5/history/city?q=Vancouver,%20ca',
		dataType: 'JSON',
		success: function(response){
			//this is how I can get 1 temperature
			// console.log(response.list[0].main.temp);

			$(response.list).each(function(){
				console.log(this.main.temp);
				console.log(this.dt);

				var dataPoint = {}
				dataPoint.y = this.main.temp
				dataPoint.x = this.dt

				//and each data point to the data array
				data.push(dataPoint);
			})

			//print uot data
			console.log(data);

			//Initialize HighChart
			initializeHighChart();
		},
		error: function () {
			alert("Cannot connect!");
		}
	});

	function initializeHighChart(){
		$('#chart').highcharts({
			//key: value
			title: {
				text: 'Historical Temperatures'
			},
			Subtitle: {
				text: 'openweathermap.org'
			},
			xAxis: {
				//Configuration of xAxis
				 type: 'datetime',
                dateTimeLabelFormats: {
                    millisecond: '%H:%M:%S.%L',
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H:%M',
                    day: '%e. %b',
                    week: '%e. %b',
                    month: '%b \'%y',
                    year: '%Y'
                    }
				},
			yAxis: {
				//Configuration of xAxis
				min: 200,
				max: 300,
				title:{
					text:'Temperature (°K)'
				}
			},
			series: [{
				//Data points
				name: 'Hong Kong',
				data: data
			}]
		});
	}
});