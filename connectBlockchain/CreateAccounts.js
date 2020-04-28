require("dotenv").config();
const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || process.env.INFURA_NETWORK_URL);
const Tx = require("ethereumjs-tx").Transaction;

const createAccount = async () => {
  const account = await web3.eth.accounts.create(["this is my seed phrase"]);

  const myAddress = process.env.MANAGER_ADDRESS;
  const privateKeyOne = Buffer.from(process.env.MANAGER_PRIVATEKEY, "hex");
  const recipient = account.address;

  const count = await web3.eth.getTransactionCount(myAddress);
  const gasPrice = await web3.eth.getGasPrice();

  const gasLimit = 1000000;
  const chainId = 4;

  const rawTransaction = {
    from: myAddress,
    nonce: web3.utils.toHex(count),
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex(gasLimit),
    to: recipient,
    value: web3.utils.toHex(web3.utils.toWei("1", "Finney")),
    chainId: chainId,
  };

  const tx = new Tx(rawTransaction, { chain: "rinkeby" });
  tx.sign(privateKeyOne);
  const serializedTx = tx.serialize();

  await web3.eth.sendSignedTransaction("0x" + serializedTx.toString("hex"));
  await web3.eth.getBalance(recipient);
  return account;
};

const createAccounts = async (quantity) => {
  const arr = [];
  for (const i = 0; i < quantity; i++) {
    arr.push("some secret phrase " + i.toString());
  }

  const create = arr.map((phrase) =>
    web3.eth.accounts.create(["this is my seed phrase"])
  );
};

const privateKeyToAccount = async (privatekey) => {
  const toAccount = await web3.eth.accounts.privateKeyToAccount(privatekey);
};

const encrypt = async (privateKey, password) => {
  let encrypt = await web3.eth.accounts.encrypt(privateKey, password);
  return encrypt;
};

const decrypt = async (keystoreJsonV3, password) => {
  let decrypt = await web3.eth.accounts.decrypt(keystoreJsonV3, password);
  return decrypt;
};

const create_encrypted_account = async (password) => {
  const account = await createAccount();
  const encrypted_account = await encrypt(account.privateKey, password);
  return encrypted_account;
};

module.exports = {
  createAccount,
  create_encrypted_account,
  encrypt,
  decrypt,
};
