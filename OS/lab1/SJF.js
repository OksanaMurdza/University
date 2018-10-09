const { generatorCreator } = require("./utils");
const quietMode = false;

class SJF {
  constructor(process, queueNumber) {
    this.process = process;

    this.currentProcessIndex = 0;
    this.processInstace = [];
    this.processInstaceSorted = [];
    this.queueNumber = queueNumber;

    this.mainInterval = null;
  }

  SJFCircle() {
    const allDone = this.process.filter(({ status }) => !status).length;
    if (!allDone) {
      this.finish();
      this.logger("finish");
      return;
    }

    const currentProcess = this.processInstace[this.currentProcessIndex];
    const result = currentProcess.next();

    // this.logger(result);

    if (result.done) {
      this.process[this.currentProcessIndex]["status"] = true;
      this.changeCurrentProcess();
    }
  }

  changeCurrentProcess() {
    let newProcessIndex;
    let minimumExecuteTime;

    this.process.forEach(({ time, status }, index) => {
      if (status) return;

      if (!minimumExecuteTime || time < minimumExecuteTime) {
        minimumExecuteTime = time;
        newProcessIndex = index;
      }
    });

    this.currentProcessIndex = newProcessIndex;
  }

  fillProcess() {
    this.processInstace = this.process.map(({ time }, index) =>
      generatorCreator(time, index)
    );
  }

  logger(text) {
    if (!quietMode && text !== "finish") {
      console.log(`${JSON.stringify(text)}   SJF | Queue ${this.queueNumber}`);
    } else {
      console.log("************");
      console.log(`Queue ${this.queueNumber}`);
      console.log(this.process);
      console.log("************");
    }
  }

  finish() {
    clearInterval(this.mainInterval);
  }

  start() {
    this.fillProcess();

    this.mainInterval = setInterval(() => this.SJFCircle(), 120);
  }
}

module.exports = SJF;
