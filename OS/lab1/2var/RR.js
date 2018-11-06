const { generatorCreator } = require("../utils");
const quietMode = false;

class RoundRobin {
  constructor(process, time, queueNumber) {
    this.process = process;
    this.quant = time;
    this.processInstace = [];
    this.queueNumber = queueNumber;

    this.countTime = 0;
    this.currentProcess = 0;

    this.mainInterval = null;
  }

  changeCurrentProcess() {
    let newProcess;

    this.process.forEach(({ status }, index) => {
      if (status || newProcess) return;

      if (index > this.currentProcess) {
        newProcess = index;
      }
    });

    // take first not finished process
    if (!newProcess) {
      this.process.forEach((item, index) => {
        if (newProcess >= 0) return;

        if (!item.status) {
          newProcess = index;
        }
      });
    }

    this.currentProcess = newProcess;
  }

  fillProcess() {
    this.processInstace = this.process.map(({ time }, index) =>
      generatorCreator(time, index)
    );
  }

  roundCircle() {
    if (!this.notFinishedProcess.length) {
      this.finish();
      return Promise.resolve([]);
    }

    if (this.countTime === this.quant) {
      this.countTime = 1;
      if (this.isCurrentProcessIsFinished) {
        this.changeCurrentProcess();
      } else {
        const notFinishedProcess = this.process[this.currentProcess];
        return Promise.resolve(notFinishedProcess);
      }
    }

    this.countTime++;

    const process = this.processInstace[this.currentProcess];
    const result = process.next();
    // this.logger(result);
    if (result.done) {
      this.process[this.currentProcess]["status"] = true;
      this.changeCurrentProcess();
    }

    return Promise.resolve(null);
  }

  logger(text) {
    if (!quietMode && text !== "finish") {
      console.log(`${JSON.stringify(text)}   RR | Queue ${this.queueNumber}`);
    } else {
      console.log("************");
      console.log(`Queue ${this.queueNumber}`);
      console.log(this.process);
      console.log("************");
    }
  }

  start() {
    this.fillProcess();
    this.mainInterval = setInterval(() => {
      this.roundCircle().then(d => {
        if (d !== null) {
          Promise.resolve(d);
        }
      });
    }, this.quant);
    return Promise.resolve([]);
  }

  finish() {
    clearInterval(this.mainInterval);
    return this.notFinishedProcess;
  }

  get isCurrentProcessIsFinished() {
    const { status } = this.process[this.currentProcess];
    return status;
  }

  // change to return GENERATOR
  get notFinishedProcess() {
    return this.process.filter(({ status }) => !status);
  }
}

module.exports = RoundRobin;
