function takeToDoList() {
  return new Promise((resolve, reject) => {
    fetch("http://10.10.0.205:3000/takeToDoList/")
      .then(d => d.json())
      .then(d => resolve(d))
      .catch(err => reject(err));
  });
}

export { takeToDoList };
