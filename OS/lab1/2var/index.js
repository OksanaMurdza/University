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
      if (currentProcess <= time) console.log(`id: ${id} | ${currentProcess}`);

      if (currentProcess > time) notFinishedProcess.push(currentProcess);
      if (currentProcess < time)
        console.log(
          `idle ${id}  process. Execute time ${time} || free time ${time -
            currentProcess}`
        );
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
    this.taskBuffer = task;
    this.sync = false;
  }

  async t() {
    this.sync = true;

    for (let i = 0; i < this.task.length; i++) {
      const currentProcess = this.getMinTask();
      await timeout(currentProcess);
      console.log(`SJF | ${currentProcess}`);
    }
    this.sync = false;
    this.task = [];
  }

  addNewTasks(item) {
    if (Array.isArray(item)) {
      this.task = [...item];
      this.taskBuffer = [...item];
    } else {
      this.task.push(item);
      this.taskBuffer.push(item);
    }

    !this.sync ? this.t() : null;
  }

  getMinTask() {
    const { taskBuffer } = this;
    let min = taskBuffer[0];
    let minIndex = 0;

    for (let i = 0; i < taskBuffer.length; i++) {
      if (taskBuffer[i] < min) {
        min = taskBuffer[i];
        minIndex = i;
      }
    }

    this.taskBuffer = taskBuffer.filter((_, index) => index !== minIndex);
    return min;
  }
}

const rr = new RR(task1, 1, 50);
const r2 = new RR([], 2, 100);
const sjf = new SJF([]);

rr.addNewTasks(20, 200);
rr.addNewTasks([120, 100, 60, 200, 140], 3 * 1000);
rr.addNewTasks(300, 5 * 1000);
