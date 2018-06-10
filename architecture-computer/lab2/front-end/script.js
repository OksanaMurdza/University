window.onload = async () => {
	const data = await fetchData()
	await render(data)
	await graphic(data)
}

function fetchData(argument) {
	const URL = 'http://localhost:5000/api'
		return fetch(`${URL}`)
			.then(data => data.json())
			.catch(err => reject(err))
}



function render(data) {
	const app = document.getElementById('app')
	let view = '<ul>'
	Object.values(data).forEach(({ author, text, date, topic }) => {
		view += 
		`<li> 
			<p class="author">${author}</p>  
			<p class="text">${date}</p>
			<p class="text">${topic}</p>
			<span class="text">${text}</span>
		</li>`
	})
	view += '</ul>'
	app.innerHTML = view
}

function graphic(data) {
	const series = 
	Highcharts.chart('graphic', {
	    chart: {
	        type: 'column'
	    },
	    title: {
	        text: 'Лаб. робота №2'
	    },
	    subtitle: {
	        text: 'Симотюк М., Місячний І.'
	    },
	    xAxis: {
	        type: 'category'
	    },
	    yAxis: {
	        title: {
	            text: 'Кількість повідомлень'
	        }

	    },
	    legend: {
	        enabled: false
	    },
	    plotOptions: {
	        series: {
	            borderWidth: 0,
	            dataLabels: {
	                enabled: true,
	                format: '{point.y:.1f}%'
	            }
	        }
	    },

	    "series": [
	        {
	            "name": "Browsers",
	            "colorByPoint": true,
	            "data": data.map(comment => ({
	            	name: `${comment.author} - ${comment.topic}`,
	            	y: data.reduce((acc, item) => {
	            		if (item.author === comment.author) {
	            			acc += 1;
	            		}
	            		return acc
	            	}, 0)
	            }))
	        }
	    ],
	});
}
