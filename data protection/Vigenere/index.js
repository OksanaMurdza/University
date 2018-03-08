const read = require("read");

const makeChoice = new Promise(res => {
  read({ prompt: "Enter word" }, (err, word) => {
    res(word);
    process.stdin.destroy();
  });
});

const takeSequenceNumber = char => char.charCodeAt(0) - 96;

const shiftLetter = (str, cryptArr, encrypt) => {
  let newString = "";

  for (let i = 0; i < str.length; i++) {
    const shiftStep = cryptArr[i % cryptArr.length];
    const charPosition = str[i].charCodeAt(0);

    const newChar = encrypt
      ? String.fromCharCode(charPosition + +shiftStep)
      : String.fromCharCode(charPosition + -shiftStep);

    newString += newChar;
  }

  return newString;
};

const takeCryptKeyAll = cryptKey => {
  let newString = "";
  for (char of cryptKey) {
    const newChar = takeSequenceNumber(char);
    newString += `${newChar}_`;
  }

  const shiftArr = newString.split("_");
  shiftArr.pop();

  return shiftArr;
};

const cryptKey = "abcd";
const cryptArr = takeCryptKeyAll(cryptKey);

makeChoice.then(word => {
  const res1 = shiftLetter(word, cryptArr, true);
  const res2 = shiftLetter(res1, cryptArr, false);

  console.log(`${res1} зашифроване повідомлення`);
  console.log(`${res2} розшифроване повідомлення`);
});
