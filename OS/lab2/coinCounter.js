class CoinCounter {
  constructor(neededSum) {
    this.neededSum = neededSum;
    this.money = global.money;
  }

  getValue(val) {
    const r = this.money.filter(item => val >= item.value && item.count > 0);

    if (!r.length) return null;
    const res = r.reduce((acc, item) => (item.value > acc.value ? item : acc));
    this.money = this.money.map(coin =>
      res.value === coin.value
        ? { ...coin, count: coin.count - 1 }
        : { ...coin }
    );

    return res;
  }

  getCoinCount() {
    const coinArr = [];
    let sum = 0;

    while (1) {
      const val = this.getValue(this.neededSum - sum);

      if (sum === this.neededSum) {
        return coinArr;
      }

      if (val === null) {
        return null;
      }

      coinArr.push(val.value);
      sum += val.value;
    }
  }
}

module.exports = CoinCounter;
