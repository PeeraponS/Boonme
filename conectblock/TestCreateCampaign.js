const Web3 = require("web3");
const chalk = require("chalk");
const endPointUrl = "https://rinkeby.infura.io/v3/991d6c0c5fd54ee4bac60feed128dffd";
var Tx = require('ethereumjs-tx').Transaction;

console.log(chalk.blue(`Endpoint: ${endPointUrl}`));
const web3 = new Web3(endPointUrl);

var myAddress = "0x9DBd4ECf641a51b741724D1078032E6F03F00a73"
const privateKeyOne = Buffer.from("7FA12852860D12815DF6FC120D7DF6EDC7029223E0B8725995FBCCE4F4F071CE", "hex");
var toAddress = "0xB1e379A0e35382cd579Ae8f181C1ff21B112a6C9"
const privateKeyTwo = Buffer.from("83a0081abc7ef41202bb691ccb6de8e34677a763fad5cae57fbdb9c0e3803964", "hex");
var contractAddress = '0xD26eA93161682E25Be07338236462185fA711961'
//contracttest1 = "0x28CAF7057f7802Ba203aDfB475657993e650E2Dd"
//contracttest2 = "0xD5b7b65DbB264374f464911971A300C0d74B34B7"
//contracttest3 = "0xD26eA93161682E25Be07338236462185fA711961"

//_token, _nameCampaign, _beneficiary, _releaseTime, _maxamount

var _token = "0xfD27b1E2A8e8c1121406cb4b0eFE6cf2aC98DE3f";
var _nameCampaign = "Test3";
var _beneficiary = "0x8233E9e38f5b13A97675f87D01262395901C58B8";
var _releaseTime = "1585743614"
var _maxamount = "2000";

const main = async () => {
    var balance = await web3.eth.getBalance(myAddress);
	// console.log(`Balance ETH: ${balance} \n`);
    console.log("Balance ETH: " + balance);

    var abicontract = [
      {
        "constant": true,
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "deployedCampaigns",
        "outputs": [
          {
            "internalType": "contract TimelockToken",
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "contract Token",
            "name": "_token",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "_nameCampaign",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "_beneficiary",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_releaseTime",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_maxamount",
            "type": "uint256"
          }
        ],
        "name": "createCampaign",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getDeployedCampaigns",
        "outputs": [
          {
            "internalType": "contract TimelockToken[]",
            "name": "",
            "type": "address[]"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ];

    var contract = new web3.eth.Contract(abicontract, contractAddress, { from: myAddress });
    

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
    "data": contract.methods.createCampaign(_token, _nameCampaign, _beneficiary, _releaseTime, _maxamount).encodeABI(),
    "chainId": chainId
};

var privateKey = new Buffer.from('7FA12852860D12815DF6FC120D7DF6EDC7029223E0B8725995FBCCE4F4F071CE', 'hex')
var tx = new Tx(rawTransaction, {'chain':'rinkeby'});
tx.sign(privateKeyOne);
var serializedTx = tx.serialize();

var receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
console.log("Receipt info: " + JSON.stringify(receipt, null));
console.log("success create")
}

var abicontract = [
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "deployedCampaigns",
    "outputs": [
      {
        "internalType": "contract TimelockToken",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "contract Token",
        "name": "_token",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_nameCampaign",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_beneficiary",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_releaseTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_maxamount",
        "type": "uint256"
      }
    ],
    "name": "createCampaign",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getDeployedCampaigns",
    "outputs": [
      {
        "internalType": "contract TimelockToken[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

const getDeployed = async () => {
const contract = new web3.eth.Contract(abicontract, contractAddress);
try {
    contract.methods.getDeployedCampaigns().call((err, result) => {
        if (err) console.log(chalk.red(err));
        else console.log(chalk.yellow(result));
    });
} catch (err) {
    console.log(err.message);
}
};

const findCampaign = async choosedorderCampaign => {
  const contract = new web3.eth.Contract(abicontract, contractAddress);
  try {
    contract.methods.deployedCampaigns(choosedorderCampaign).call((err, result) => {
      if (err) console.log(chalk.red(err));
      else console.log(chalk.yellow(result));
    });
  } catch (err) {
    console.log(err.message)
  }
}

// main();
getDeployed();
// findCampaign(0);


//studycampaign = 0x4E3f6f0cD87729C18A998A38128787bA0948413D
//sportcampaign = 0x367eBdEB73Bb9A53f58D5e46b7fc4D6cAD6Acf67
// 0x4E3f6f0cD87729C18A998A38128787bA0948413D,0x367eBdEB73Bb9A53f58D5e46b7fc4D6cAD6Acf67
// 0xa4499d6Fb2CD019434d69ef4a3EFD32A2AE2060c



