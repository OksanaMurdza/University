const RR = require("./RR");
const ShorJobFirst = require("./SJF");
const { timeOut } = require("./utils");

class Queue {
  constructor(process, algorithmType, time) {
    this.process = process;
    this.algorithmType = algorithmType;
    this.time = time;

    this.algorithmInstace = null;
    this.timer = null;
    this.finishHandler = null;
  }

  start() {
    switch (this.algorithmType) {
      case "RR":
        const RoundRobin = new RR(this.process);
        this.algorithmInstace = RoundRobin;
        this.algorithmInstace.start();
        break;
      case "SJF":
        const SJF = new ShorJobFirst(this.process);
        this.algorithmInstace = SJF;
        this.algorithmInstace.start();
        break;
    }

    return this.finish();
  }

  async finish() {
    return await timeOut(this.time, () => this.algorithmInstace.finish());
  }
}

module.exports = Queue;
