const read = require('read');
const RSA = require('node-rsa');
const fs = require('fs');

const key = require('./key');

const MESSAGE = 'some test';

const createKey =  word  => key.encrypt(word, 'base64');
const decryptedKey = word => key.decrypt(word, 'utf8');


const makeChoice = new Promise( res => {
  read({ prompt : '1 - декодировать; 2 - закодировать' },  (err, choice) => {
          res(choice)
          process.stdin.destroy();
      })
})


makeChoice
  .then(choice => {
     if (choice == 1) {
      const fileContent = fs.readFileSync("message.txt", "utf8");
      console.log(fileContent);

      console.log(decryptedKey(fileContent, 'utf-8'));
     } else 
      fs.writeFileSync("message.txt", createKey(MESSAGE))   

  });
