function* generatorCreator(time, id) {
  for (let i = 1; i <= time - 1; i++) {
    yield `${i}  id - ${id}`;
  }
  return `${time} id - ${id}`;
}

function timeOut(time, cb) {
  return new Promise(resolve => {
    setTimeout(() => {
      const result = cb();
      resolve(result);
    }, time);
  });
}

function createProcess(process) {
  return process.map(executeTime => ({
    time: executeTime,
    status: false
  }));
}

module.exports = {
  timeOut,
  createProcess,
  generatorCreator
};
