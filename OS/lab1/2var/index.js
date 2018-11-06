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
