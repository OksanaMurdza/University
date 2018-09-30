const Queue = require("./queue");
const { createProcess } = require("./utils");

const PROCESS = [25, 40, 33, 90, 22];

const TIME_FOR_FIRST_QUEUE = 50;
const TIME_FOR_SECOND_QUEUE = 100;

const processObj = createProcess(PROCESS);

const FIRST_QUEUE = new Queue(processObj, "RR", TIME_FOR_FIRST_QUEUE);
let SECOND_QUEUE;
let THIRD_QUEUE;

// FIRST_QUEUE.finish();

FIRST_QUEUE.start()
  .then(
    notFinishedProcess =>
      (SECOND_QUEUE = new Queue(
        notFinishedProcess,
        "RR",
        TIME_FOR_SECOND_QUEUE
      ))
  )
  .then(() => SECOND_QUEUE.start())
  .then(
    notFinishedProcess =>
      (THIRD_QUEUE = new Queue(notFinishedProcess, "SJF", 3000))
  );
