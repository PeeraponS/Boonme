const Web3 = require("web3");
const chalk = require("chalk");
const endPointUrl = "https://rinkeby.infura.io/v3/991d6c0c5fd54ee4bac60feed128dffd";
var Tx = require('ethereumjs-tx').Transaction;


console.log(chalk.blue(`Endpoint: ${endPointUrl}`));
const web3 = new Web3(endPointUrl);


const contractABI = require("/12-3-2020/build/contracts/TimelockToken.json")
var myAddress = "0x9DBd4ECf641a51b741724D1078032E6F03F00a73"
const privateKeyOne = Buffer.from("7FA12852860D12815DF6FC120D7DF6EDC7029223E0B8725995FBCCE4F4F071CE", "hex");



const releaseAmount = async (contractAddress, transferAmount) => {
    var balance = await web3.eth.getBalance(myAddress);

	console.log("Balance ETH: " + balance);


  var contract = new web3.eth.Contract(contractABI.abi, contractAddress)

  
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
    "to": contractAddress,
    "value": "0x0",
    "data": contract.methods.releaseAmount(transferAmount).encodeABI(),
    "chainId": chainId
};

    var tx = new Tx(rawTransaction, {'chain':'rinkeby'});
    tx.sign(privateKeyOne);
    var serializedTx = tx.serialize();

    var receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
    console.log("Receipt info: " + JSON.stringify(receipt, null));

    // var balance = await contract.methods.balanceOf(myAddress).call();
    // var balanceTwo = await contract.methods.balanceOf(contractAddress).call();
  // console.log("Balance after send: " + balance);
  // console.log("Balance of addressTwo " + balanceTwo)

}


var contractAddress = '0x69A17c8fAbA2cF41Afc5F5874A487b844D5Cf9E7'
//adress campaign = 
//          [0]   = 0x69A17c8fAbA2cF41Afc5F5874A487b844D5Cf9E7

var transferAmount = 5000;

releaseAmount(contractAddress, transferAmount)
