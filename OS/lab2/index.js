const bank = require("./bank");
const MB = require("./mailBox");
const procA = require("./processA");
const procB = require("./processB");

const MailBox = new MB();
const processA = new procA(MailBox);
const processB = new procB(MailBox);

async function terminal(moneyRequest) {
  const len = moneyRequest.length;

  for (let i = 0; i < len; i++) {
    const currentReq = moneyRequest[i];
    processA.getMoney(currentReq);

    const r = await processB.checkMailBox(currentReq);
    console.log(r);
  }
}

terminal([50, 10]);
