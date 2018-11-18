const CC = require("./coinCounter");

class processA {
  constructor(mailBox) {
    this.money = global.money;
    this.mailBox = mailBox;
  }

  getMoney(sum) {
    const CoinCounter = new CC(sum, this.money);
    const coin = CoinCounter.getCoinCount();
    this.mailBox.sendMessage(coin);
    return coin;
  }
}

module.exports = processA;
