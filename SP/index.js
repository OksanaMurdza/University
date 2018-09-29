const PROCESS = [
  {
    time: 4,
    status: false
  },
  {
    time: 2,
    status: false
  }
];

const QUANTUM = 3;

const PROCESS_INST = PROCESS.map(({ time }, index) =>
  generatorCreator(time, index)
);

const exucuteTimeSum = PROCESS.reduce((acc, { time }) => (acc += time), 0);

const [f, s] = PROCESS_INST;

let countTime = 0;
let quantumProcess = 0;
let currentProcess = 0;

const mainInterval = setInterval(() => intervalChecker(), 1 * 1000);

function intervalChecker() {
  if (countTime === exucuteTimeSum + 2) {
    clearInterval(mainInterval);
  } else {
    countTime++;
    if (quantumProcess === QUANTUM) {
      quantumProcess = 0;
      changeCurrentProcess();
    } else {
      quantumProcess++;
    }

    const process = PROCESS_INST[currentProcess];
    const result = process.next();
    console.log(result);
    if (result.done) {
      PROCESS[currentProcess]["status"] = true;
    }
  }
}

function changeCurrentProcess() {
  const notFinishedProcess = PROCESS.filter(({ status }) => !status);
  if (currentProcess === notFinishedProcess.length) {
    currentProcess = 0;
  } else {
    currentProcess++;
  }
}

function* generatorCreator(time, id) {
  for (let i = 1; i <= time - 1; i++) {
    yield `${i}  id - ${id}`;
  }
  return `${time} id - ${id}`;
}
