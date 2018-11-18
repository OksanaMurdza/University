class MailBox {
  constructor() {
    this.nests = [];
  }

  getMessage() {
    const { nests } = this;

    if (nests.length) {
      return this.nests.shift();
    }

    return { empty: true };
  }

  sendMessage(msg) {
    this.nests.push(msg);
  }
}

module.exports = MailBox;
