const Web3 = require("web3");
const chalk = require("chalk");
const endPointUrl =
  "https://rinkeby.infura.io/v3/991d6c0c5fd54ee4bac60feed128dffd";
const Tx = require("ethereumjs-tx").Transaction;

console.log(chalk.blue(`Endpoint: ${endPointUrl}`));
const web3 = new Web3(endPointUrl);

const contractABI = require("../build/contracts/Token.json");
const contractAddress = "0xE4289B1DdDc2d8F678c4431C240A9940f0B69e70";

const transferto = async (
  myAddress,
  privateKeyOne,
  addressTwo,
  transferAmount
) => {
  const contract = new web3.eth.Contract(contractABI.abi, contractAddress, {
    from: myAddress,
  });

  const count = await web3.eth.getTransactionCount(myAddress);
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 1000000;
  const chainId = 4;

  const rawTransaction = {
    from: myAddress,
    nonce: web3.utils.toHex(count),
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex(gasLimit),
    to: contractAddress,
    value: "0x0",
    data: contract.methods.transfer(addressTwo, transferAmount).encodeABI(),
    chainId: chainId,
  };

  const tx = new Tx(rawTransaction, { chain: "rinkeby" });
  tx.sign(Buffer.from(privateKeyOne, "hex"));
  const serializedTx = tx.serialize();
  const receipt = await web3.eth.sendSignedTransaction(
    "0x" + serializedTx.toString("hex")
  );

  const TxHash = receipt.transactionHash;
  return TxHash;
};

module.exports = {
  transferto,
};
