const Web3 = require("web3");
const chalk = require("chalk");
require("dotenv").config();
const endPointUrl =
  "https://rinkeby.infura.io/v3/991d6c0c5fd54ee4bac60feed128dffd";
const Tx = require("ethereumjs-tx").Transaction;

const web3 = new Web3(endPointUrl);

const contractABI = require("../build/contracts/Token.json");
const contractAddress = "0xE4289B1DdDc2d8F678c4431C240A9940f0B69e70";

const myAddress = process.env.MANAGER_ADDRESS;
const privateKeyOne = Buffer.from(process.env.MANAGER_PRIVATEKEY, "hex");

const buytoken = async (purchasrAddress, purchaseAmount) => {
  const contract = new web3.eth.Contract(contractABI.abi, contractAddress, {
    from: myAddress,
  });

  const count = await web3.eth.getTransactionCount(myAddress);
  const gasPrice = await web3.eth.getGasPrice();

  const gasLimit = 1000000;
  const chainId = 4;

  const rawTransaction = {
    from: myAddress,
    /* "nonce": "0x" + count.toString(16),*/
    nonce: web3.utils.toHex(count),
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex(gasLimit),
    to: contractAddress,
    value: "0x0",
    data: contract.methods
      .transfer(purchasrAddress, purchaseAmount)
      .encodeABI(),
    chainId: chainId,
  };

  const tx = new Tx(rawTransaction, { chain: "rinkeby" });
  tx.sign(privateKeyOne);
  const serializedTx = tx.serialize();

  const receipt = await web3.eth.sendSignedTransaction(
    "0x" + serializedTx.toString("hex")
  );
};

// example
// const purchasrAddress = "0xB1e379A0e35382cd579Ae8f181C1ff21B112a6C9";
// const purchaseAmount = 5000;
// buytoken(purchasrAddress, purchaseAmount);

module.exports = {
  buytoken,
};
