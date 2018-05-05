window.onload = () => {
	fetchData()
		.then(data => render(data))
		.catch(err => console.log(err))
}

function fetchData(argument) {
	const URL = 'http://localhost:5000/api'
	return new Promise((resolve, reject) => {
		fetch(`${URL}`)
			.then(data => data.json())
			.then(data => resolve(data))
			.catch(err => reject(err))
	})
}



function render(data) {
	const app = document.getElementById('app')
	let view = '<ul>'
	Object.values(data).forEach(({ author, text }) => {
		view += 
		`<li> 
			<p class="author">${author}</p>  
			<span class="text">${text}</span>
		</li>`
	})
	view += '</ul>'
	app.innerHTML = view
}