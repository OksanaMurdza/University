class processB {
  constructor(mailBox) {
    this.money = global.money;
    this.mailBox = mailBox;
  }

  changeUserBank(coin) {
    coin.map(item => {
      global.money = global.money.map(userMoney =>
        item === userMoney.value
          ? { ...userMoney, count: userMoney.count - 1 }
          : { ...userMoney }
      );
    });
  }

  timeoutChecker(m) {
    return new Promise(res => {
      setTimeout(() => res(), 2 * 1000);
    });
  }

  async checkMailBox(m) {
    await this.timeoutChecker(m);
    const msg = this.mailBox.getMessage();
    if (msg !== null && msg.empty) {
      this.checkMailBox();
    }

    if (Array.isArray(msg)) {
      const sum = msg.reduce((acc, item) => (acc += item));
      this.changeUserBank(msg);
      return `${msg.join(" + ")} = ${sum}`;
    }
    return "Error: bank can't give out money";
  }
}

module.exports = processB;
