const read = require('read');
const Caesar = require('caesar-salad').Caesar;

const makeChoice = new Promise( res => {
  read({ prompt : 'Enter word' },  (err, word) => {
          res(word)
          process.stdin.destroy();
      })
})


makeChoice
	.then( word => console.log( Caesar.Cipher('c').crypt(word)))
