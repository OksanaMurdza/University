const Queue = require("./queue");
const { createProcess, timeOut } = require("./utils");

const PROCESS = [25, 40, 77, 90, 22, 150];

const TIME_FOR_FIRST_QUEUE = 50;
const TIME_FOR_SECOND_QUEUE = 100;

const TASK_FOR_FIRST_QUEUE = createProcess(
  PROCESS.filter(timeExecute => timeExecute <= TIME_FOR_FIRST_QUEUE)
);

const TASK_FOR_SECOND_QUEUE = createProcess(
  PROCESS.filter(
    timeExecute =>
      timeExecute >= TIME_FOR_FIRST_QUEUE &&
      timeExecute <= TIME_FOR_SECOND_QUEUE
  )
);

const TASK_FOR_THIRD_QUEUE = createProcess(
  PROCESS.filter(timeExecute => timeExecute > TIME_FOR_SECOND_QUEUE)
);

const FIRST_QUEUE = new Queue(
  TASK_FOR_FIRST_QUEUE,
  "RR",
  TIME_FOR_FIRST_QUEUE,
  1
);
const SECOND_QUEUE = new Queue(
  TASK_FOR_SECOND_QUEUE,
  "RR",
  TIME_FOR_SECOND_QUEUE,
  2
);
const THIRD_QUEUE = new Queue(TASK_FOR_THIRD_QUEUE, "SJF", undefined, 3);

async function init() {
  await timeOut(TIME_FOR_FIRST_QUEUE, () => FIRST_QUEUE.start());
  await timeOut(TIME_FOR_SECOND_QUEUE, () => SECOND_QUEUE.start());
  await timeOut(Infinity, () => THIRD_QUEUE.start());
}

init();
