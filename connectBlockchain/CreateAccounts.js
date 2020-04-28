require('dotenv').config()
const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || process.env.INFURA_NETWORK_URL);
const chalk = require("chalk");
var Tx = require('ethereumjs-tx').Transaction;
web3.eth.defaultAccount = process.env.WALLET_ADDRESS


const infura = "https://rinkeby.infura.io/v3/991d6c0c5fd54ee4bac60feed128dffd";
const url = "https://localhost:8546";

const createAccount = async () => {
  var account = await web3.eth.accounts.create(["this is my seed phrase"]);
  console.log(chalk.greenBright(JSON.stringify(account, null)));
  
  var myAddress = process.env.MANAGER_ADDRESS;
  var privateKeyOne = Buffer.from(process.env.MANAGER_PRIVATEKEY, "hex");
  var recipient = account.address;
  var balance = await web3.eth.getBalance(myAddress);

	console.log("Balance ETH: " + balance);

  var count = await web3.eth.getTransactionCount(myAddress);
  const gasPrice = await web3.eth.getGasPrice();
  
  console.log("gasPrice: "+ gasPrice)
  var gasLimit = 1000000;
  var chainId = 4;
  
  var rawTransaction = {
    "from": myAddress,
    /* "nonce": "0x" + count.toString(16),*/
    "nonce":  web3.utils.toHex(count),
    "gasPrice": web3.utils.toHex(gasPrice),
    "gasLimit": web3.utils.toHex(gasLimit),
    "to": recipient,
    "value": web3.utils.toHex( web3.utils.toWei('1', 'Finney') ),
    "chainId": chainId
  };
  
  var tx = new Tx(rawTransaction, {'chain':'rinkeby'});
  tx.sign(privateKeyOne);
  var serializedTx = tx.serialize();
  
  var receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
  console.log("Receipt info: " + JSON.stringify(receipt, null));
  
  var balanceTwo = await web3.eth.getBalance(recipient);
	console.log("Balance of addressTwo: " + balanceTwo);
  return account;
};


const createAccounts = async (quantity) => {
  var arr = [];
  for (var i = 0; i < quantity; i++) {
    arr.push("some secret phrase " + i.toString());
  }

  var create = arr.map((phrase) =>
    web3.eth.accounts.create(["this is my seed phrase"])
  );
  // console.log(chalk.greenBright(JSON.stringify(create, null)));
};

const privateKeyToAccount = async (privatekey) => {
  var toAccount = await web3.eth.accounts.privateKeyToAccount(privatekey);
  // console.log(chalk.greenBright(JSON.stringify(toAccount, null)));
};

const encrypt = async (privateKey, password) => {
  let encrypt = await web3.eth.accounts.encrypt(privateKey, password);
  // console.log(chalk.greenBright(JSON.stringify(encrypt, null)));
  return encrypt;
};

const decrypt = async (keystoreJsonV3, password) => {
  let decrypt = await web3.eth.accounts.decrypt(keystoreJsonV3, password);
  // console.log(chalk.greenBright(JSON.stringify(decrypt, null)));
  return decrypt;
};

const create_encrypted_account = async (password) => {
  const account = await createAccount();
  const encrypted_account = await encrypt(account.privateKey, password);
  return encrypted_account;
};

// createAccount();
// transferEther("0xbca841cec9ed2F2fdcEEeF5426901d422C719104");
// createAccounts(10);
// privateKeyToAccount('0x7dacb9783651a8c10f9665e731ec5f925d3f7f19122bb43e4bb6e111399600d0');
// encrypt('0x7dacb9783651a8c10f9665e731ec5f925d3f7f19122bb43e4bb6e111399600d0', 'TestPassword999');
// decrypt('{"version":3,"id":"9013f4f9-f726-49c5-a46c-41f102fc356d","address":"76a70310e3c74011c94cdac676f3ba5e7379d1cb","crypto":{"ciphertext":"ee9f147e266b53e892ef8e0a6f0011d35a728f21e95ddbec8947eadaf1c7b405","cipherparams":{"iv":"bb695be5963b6dcd22e2acb835f42623"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"d0eee443c44b78ac0ecaf90b97217792965b290bf973f8bdf345b700f9447cd0","n":8192,"r":8,"p":1},"mac":"a210ba870f630f5867f26b720ecb7e2479079bc558851376b9bab3cf15173b11"}}','TestPassword999')

module.exports = {
  createAccount,
  create_encrypted_account,
  encrypt,
  decrypt,
};
