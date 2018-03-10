export function takeDiaryTopic() {
	return new Promise((resolve, reject) => {
		fetch('http://localhost:3000/takeDiaryTopic/')
			.then((d) => d.json())
			.then((d) => resolve(d))
			.catch((err) => reject(err));
	});
}

export function takeMessages() {
	return new Promise((resolve, reject) => {
		fetch('http://localhost:3000/takeMessages/')
			.then((d) => d.json())
			.then((d) => resolve(d))
			.catch((err) => reject(err));
	});
}
