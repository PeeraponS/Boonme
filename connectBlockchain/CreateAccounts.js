const Web3 = require("web3");
const chalk = require("chalk");
const url = "https://localhost:8546";
const infura = "https://rinkeby.infura.io/v3/991d6c0c5fd54ee4bac60feed128dffd";
const web3 = new Web3(Web3.givenProvider || infura);


const createAccount = async () => {
  var create = await web3.eth.accounts.create(["this is my seed phrase"]);
  console.log(chalk.greenBright(JSON.stringify(create, null)));
};


const createAccounts = async (quantity) => {
  var arr = [];
  for (var i = 0; i < quantity; i++) {
    arr.push("some secret phrase " + i.toString());
  }

  var create = arr.map((phrase) =>
    web3.eth.accounts.create(["this is my seed phrase"])
  );
  console.log(chalk.greenBright(JSON.stringify(create, null)));
};


const privateKeyToAccount = async (privatekey) => {
  var toAccount = await web3.eth.accounts.privateKeyToAccount(privatekey);
  console.log(chalk.greenBright(JSON.stringify(toAccount, null)));
};


const encrypt = async (privateKey, password) => {
    var encrypt = await web3.eth.accounts.encrypt(privateKey, password);
    console.log(chalk.greenBright(JSON.stringify(encrypt, null)))
}

const decrypt = async (keystoreJsonV3, password) => {
    var decrypt = await web3.eth.accounts.decrypt(keystoreJsonV3, password);
    console.log(chalk.greenBright(JSON.stringify(decrypt, null)))
}

// createAccount();
// createAccounts(10);
// privateKeyToAccount('0x7dacb9783651a8c10f9665e731ec5f925d3f7f19122bb43e4bb6e111399600d0');
// encrypt('0x7dacb9783651a8c10f9665e731ec5f925d3f7f19122bb43e4bb6e111399600d0', 'TestPassword999');
// decrypt('{"version":3,"id":"9013f4f9-f726-49c5-a46c-41f102fc356d","address":"76a70310e3c74011c94cdac676f3ba5e7379d1cb","crypto":{"ciphertext":"ee9f147e266b53e892ef8e0a6f0011d35a728f21e95ddbec8947eadaf1c7b405","cipherparams":{"iv":"bb695be5963b6dcd22e2acb835f42623"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"d0eee443c44b78ac0ecaf90b97217792965b290bf973f8bdf345b700f9447cd0","n":8192,"r":8,"p":1},"mac":"a210ba870f630f5867f26b720ecb7e2479079bc558851376b9bab3cf15173b11"}}','TestPassword999')
