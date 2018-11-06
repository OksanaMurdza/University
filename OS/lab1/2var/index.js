// const { createProcess, generatorCreator } = require("../utils");

// let PROCESS = [10, 30, 30, 31, 33, 32, 34, 14, 14, 11, 10, 40, 50];
// const QUANT = 20;

// class RR {
//   constructor(process, time, id) {
//     this.process = process;
//     this.time = time;
//     this.id = id;

//     this.processSyncFlag = true;
//     this.bufferNewProcess = [];
//   }

//   addNewProcess(newProcess) {
//     const { id, processSyncFlag } = this;

//     if (!newProcess.length) return;

//     if (!processSyncFlag) {
//       setTimeout(() => this.addNewProcess(newProcess), 0);
//       return;
//     }
//     this.process = [...newProcess];

//     this.t().then(p => {
//       switch (id) {
//         case 1:
//           r2.addNewProcess(p);
//           break;
//         case 2:
//           sjf.addNewProcess(p);
//           break;
//       }
//     });
//   }

//   async t() {
//     const buff = [];
//     this.processSyncFlag = false;
//     const processLen = this.process.length;
//     for (let i = 0; i < processLen; i++) {
//       const r = await this.execute(this.getNewProcess);
//       if (r) {
//         console.log(`process RR: ${this.id}: `, r);
//       }
//       buff.push(r);
//     }
//     this.process = [];
//     this.processSyncFlag = true;
//     return buff.filter(process => process);
//   }

//   execute(ms) {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         this.time >= ms ? resolve(null) : resolve(ms);
//       }, this.time);
//     });
//   }

//   get getNewProcess() {
//     const [p] = this.process;
//     this.process.shift();
//     return p;
//   }
// }

// class SJF {
//   constructor(process) {
//     this.process = process;

//     this.processSyncBuffer = [];
//     this.processSyncFlag = true;
//   }

//   addNewProcess(newProcess) {
//     if (!newProcess.length) return;

//     if (!this.processSyncFlag) {
//       this.processSyncBuffer = [...newProcess];
//       return;
//     }

//     this.process = [...newProcess];
//     this.t().then(d => {
//       if (d.length) {
//         console.log(`process SJF: ${d}`);
//       }
//     });
//   }

//   execute(ms) {
//     return new Promise(resolve => {
//       setTimeout(() => resolve(ms), ms);
//     });
//   }

//   async t() {
//     this.processSyncFlag = false;
//     const processLen = this.process.length;
//     const buff = [];
//     for (let i = 0; i < processLen; i++) {
//       const { process } = this.getNewProcess;
//       const r = await this.execute(process);
//       buff.push(r);
//       if (this.processSyncBuffer.length) {
//         this.process = [...this.processSyncBuffer];
//         this.processSyncBuffer = [];
//         this.processSyncFlag = true;
//         this.t().then(d => console.log(`process SJF: ${d}`));
//         return buff;
//       }
//     }
//     this.processSyncFlag = true;
//     return buff;
//   }

//   get getNewProcess() {
//     let min = {
//       process: this.process[0],
//       index: 0
//     };

//     this.process.forEach((item, index) => {
//       if (item < min) {
//         min = {
//           process: item,
//           index: index
//         };
//       }
//     });

//     this.process = this.process.filter((_, index) => !index !== min.index);

//     return min;
//   }
// }

// const sjf = new SJF([]);
// const r2 = new RR([], QUANT + 15, 2);
// const rr = new RR([], QUANT, 1);

// rr.addNewProcess(PROCESS);

// setTimeout(() => {
//   console.log("add new item");
//   rr.addNewProcess([10, 10, 14, 10, 13, 12, 100]);
// }, QUANT + 540);

const task1 = [1, 2, 3, 1, 4, 40];
const task2 = [];

function timeout(ms) {
  return new Promise(res => {
    setTimeout(() => res(ms), ms);
  });
}

class RR {
  constructor(task, id, time) {
    this.sync = false;
    this.time = time;
    this.task = task;
    this.id = id;
  }

  async t() {
    const { time, id } = this;
    this.sync = true;
    const notFinishedProcess = [];

    for (let i = 0; i < this.task.length; i++) {
      const currentProcess = this.task[i];
      await timeout(time);
      console.log(`id: ${id} | ${currentProcess}`);

      if (currentProcess > time) notFinishedProcess.push(currentProcess);
    }
    this.sync = false;
    this.task = [];
    switch (id) {
      case 1:
        if (notFinishedProcess.length) r2.addNewTasks(notFinishedProcess, 0);
        break;
      case 2:
        if (notFinishedProcess.length) sjf.addNewTasks(notFinishedProcess);
    }
  }

  addNewTasks(item, ms) {
    setTimeout(() => {
      if (Array.isArray(item)) {
        this.task = [...item];
      } else {
        this.task.push(item);
      }
      !this.sync ? this.t() : null;
    }, ms);
  }
}

class SJF {
  constructor(task) {
    this.task = task;
    this.sync = false;
  }

  async t() {
    this.sync = true;

    for (let i = 0; i < this.task.length; i++) {
      const currentProcess = this.task[i];
      await timeout(currentProcess);
      console.log(`SJF | ${currentProcess}`);
    }
    this.sync = false;
    this.task = [];
  }

  addNewTasks(item) {
    if (Array.isArray(item)) {
      this.task = [...item];
    } else {
      this.task.push(item);
    }

    !this.sync ? this.t() : null;
  }
}

const rr = new RR(task1, 1, 20);
const r2 = new RR([], 2, 50);
const sjf = new SJF([]);

rr.addNewTasks(2, 200);
rr.addNewTasks([30, 10, 5, 60], 3 * 1000);
