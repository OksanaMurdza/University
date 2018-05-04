window.onload = () => {
	render()
	// fetchData()
		// .then(data => render(data))
		// .catch(err => console.log(Err))
}

function fetchData(argument) {
	const URL = '10.25.'
	return new Promise((resolve, reject) => {
		fetch(`${URL}/`)
			.then(data => data.json())
			.then(data => resolve(data))
			.catch(err => reject(err))
	})
}


function render(data) {
	const app = document.getElementById('app')
	let view = 'ul'
	console.log(data)
}