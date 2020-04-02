const Web3 = require("web3");
const chalk = require("chalk");
const endPointUrl = "https://rinkeby.infura.io/v3/991d6c0c5fd54ee4bac60feed128dffd";
var Tx = require('ethereumjs-tx').Transaction;



console.log(chalk.blue(`Endpoint: ${endPointUrl}`));
const web3 = new Web3(endPointUrl);

// const contractABI = require("/12-3-2020/build/contracts/Token.json")
// const contractAddress = "0x4d9f3147592e9a884100fef79084c5de95653188";

// const contract = new web3.eth.Contract(contractABI.abi, contractAddress)

const contractABI = require("/12-3-2020/build/contracts/Token.json")
const contractCampaignABI = require("/12-3-2020/build/contracts/TimelockToken.json")
var myAddress = "0x9DBd4ECf641a51b741724D1078032E6F03F00a73"
const privateKeyOne = Buffer.from("7FA12852860D12815DF6FC120D7DF6EDC7029223E0B8725995FBCCE4F4F071CE", "hex");

var contractAddress = '0x4E3f6f0cD87729C18A998A38128787bA0948413D'
//contracttest1 = "0x940c40Ed8d660e13bb8D4A67f86fcE04f2A93dD6"
//contracttest2 = "0xfD27b1E2A8e8c1121406cb4b0eFE6cf2aC98DE3f"
var campaignAddress = '0x4E3f6f0cD87729C18A998A38128787bA0948413D'


const main = async () => {
    var balance = await web3.eth.getBalance(myAddress);
	// console.log(`Balance ETH: ${balance} \n`);
	console.log("Balance ETH: " + balance);


  var contract = new web3.eth.Contract(contractABI.abi, contractAddress)
  
 
//   console.log(`Balance before send: ${balance} \n`);
  console.log("Balance before send: " + balanceof);
  
  var count = await web3.eth.getTransactionCount(myAddress);
  const gasPrice = await web3.eth.getGasPrice();
//   console.log(`gasPrice: ${gasPrice}\n`)
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
    "data": contract.methods.release().encodeABI(),
    "chainId": chainId
};

var privateKey = new Buffer.from('7FA12852860D12815DF6FC120D7DF6EDC7029223E0B8725995FBCCE4F4F071CE', 'hex')
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

main()
