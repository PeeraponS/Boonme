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
  try {
    console.log("-- transferto params --");
    console.log("myAddress");
    console.log(myAddress);
    console.log("privateKeyOne");
    console.log(privateKeyOne);
    console.log("addressTwo");
    console.log(addressTwo);
    console.log("transferAmount");
    console.log(transferAmount);

    console.log("1");
    const contract = new web3.eth.Contract(contractABI.abi, contractAddress, {
      from: myAddress,
    });

    console.log("2");
    const count = await web3.eth.getTransactionCount(myAddress);
    console.log("3");
    const gasPrice = await web3.eth.getGasPrice();
    console.log("4");
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
    console.log("5");

    const tx = new Tx(rawTransaction, { chain: "rinkeby" });
    console.log("6");
    tx.sign(Buffer.from(privateKeyOne, "hex"));
    console.log("7");
    const serializedTx = tx.serialize();
    console.log("8");
    const receipt = await web3.eth.sendSignedTransaction(
      "0x" + serializedTx.toString("hex")
    );
    console.log("9");

    const TxHash = receipt.transactionHash;
    return TxHash;
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
};

// myAddress
// 0xC409F1ADc295873C538d9d8E1E9Dd9Be3120A4AC
// privateKeyOne
// e76ae7a858bd4dba96809d6facdf85ada297901c01fb386c4c7231a063e8920f
// addressTwo
// 0x6932ca3133F151F65536a0b21cC812D97B3dD046
// transferAmount
// 100

// transferto(
//   "0xC409F1ADc295873C538d9d8E1E9Dd9Be3120A4AC",
//   "e76ae7a858bd4dba96809d6facdf85ada297901c01fb386c4c7231a063e8920f",
//   "0x6932ca3133F151F65536a0b21cC812D97B3dD046",
//   100S
// );

module.exports = {
  transferto,
};
