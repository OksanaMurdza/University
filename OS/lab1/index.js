const Queue = require('./queue');
const { createProcess } = require('./utils');

const PROCESS = [25, 40, 33, 90, 22, 150];

const TIME_FOR_FIRST_QUEUE = 50;
const TIME_FOR_SECOND_QUEUE = 100;
const processObj = createProcess(PROCESS);

const TASK_FOR_FIRST_QUEUE = createProcess(
  PROCESS.filter(timeExecute => timeExecute <= TIME_FOR_FIRST_QUEUE)
);

const TASK_FOR_SECOND_QUEUE = createProcess(
  PROCESS.filter(
    timeExecute =>
      timeExecute >= TIME_FOR_FIRST_QUEUE && timeExecute <= TIME_FOR_FIRST_QUEUE
  )
);

const TASK_FOR_THIRD_QUEUE = createProcess(
  PROCESS.filter(timeExecute => timeExecute > TIME_FOR_SECOND_QUEUE)
);

const FIRST_QUEUE = new Queue(TASK_FOR_FIRST_QUEUE, 'RR', TIME_FOR_FIRST_QUEUE);
const SECOND_QUEUE = new Queue(
  TASK_FOR_SECOND_QUEUE,
  'RR',
  TIME_FOR_FIRST_QUEUE
);
const THIRD_QUEUE = new Queue(TASK_FOR_THIRD_QUEUE, 'SJF');

FIRST_QUEUE.start();
SECOND_QUEUE.start();
THIRD_QUEUE.start();

// let SECOND_QUEUE;
// let THIRD_QUEUE;

// FIRST_QUEUE.finish();

// FIRST_QUEUE.start()
//   .then(
//     notFinishedProcess =>
//       (SECOND_QUEUE = new Queue(
//         notFinishedProcess,
//         "RR",
//         TIME_FOR_SECOND_QUEUE
//       ))
//   )
//   .then(() => SECOND_QUEUE.start())
//   .then(
//     notFinishedProcess =>
//       (THIRD_QUEUE = new Queue(notFinishedProcess, "SJF", 3000))
//   );
