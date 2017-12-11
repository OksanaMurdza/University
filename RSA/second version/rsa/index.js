const read = require("read");

const p = 53;
const q = 59;

const n = p * q;

const f = (p - 1) * (q - 1);

const e = 1;

function RSA(message) {
  let d = 0;
  while ((++d * e) % f != 1) {}

  let c = "";
  for (let char of message) c += char.charCodeAt(0) ** e % n + "_";

  let decode = "";
  c.split("_").map(item => (decode += item ** d % n + ","));

  const res = String.fromCharCode(...decode.split(","));

  console.log(decode.split(",").join(""));
  console.log(res);
}

const makeChoice = new Promise(res => {
  read({ prompt: "Enter word" }, (err, word) => {
    res(word);
    process.stdin.destroy();
  });
});

makeChoice.then(word => RSA(word));
