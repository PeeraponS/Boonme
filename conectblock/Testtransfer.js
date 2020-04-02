const Web3 = require("web3");
const chalk = require("chalk");
const endPointUrl = "https://rinkeby.infura.io/v3/991d6c0c5fd54ee4bac60feed128dffd";
var Tx = require('ethereumjs-tx').Transaction;



console.log(chalk.blue(`Endpoint: ${endPointUrl}`));
const web3 = new Web3(endPointUrl);

// const contractABI = require("/12-3-2020/build/contracts/Token.json")
// const contractAddress = "0x4d9f3147592e9a884100fef79084c5de95653188";

// const contract = new web3.eth.Contract(contractABI.abi, contractAddress)

var myAddress = "0x9DBd4ECf641a51b741724D1078032E6F03F00a73"
const privateKeyOne = Buffer.from("7FA12852860D12815DF6FC120D7DF6EDC7029223E0B8725995FBCCE4F4F071CE", "hex");
var toAddress = "0xB1e379A0e35382cd579Ae8f181C1ff21B112a6C9"
const privateKeyTwo = Buffer.from("83a0081abc7ef41202bb691ccb6de8e34677a763fad5cae57fbdb9c0e3803964", "hex");
var contractAddress = '0xfD27b1E2A8e8c1121406cb4b0eFE6cf2aC98DE3f'
//contracttest1 = "0x940c40Ed8d660e13bb8D4A67f86fcE04f2A93dD6"
//contracttest2 = "0xfD27b1E2A8e8c1121406cb4b0eFE6cf2aC98DE3f"

const main = async () => {
    var balance = await web3.eth.getBalance(myAddress);
	// console.log(`Balance ETH: ${balance} \n`);
	console.log("Balance ETH: " + balance);




var abiArray = [
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
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
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
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
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
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
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "maxamount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transferCampaign",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

  var contract = new web3.eth.Contract(abiArray, contractAddress, {from: myAddress})
  var balanceof = await contract.methods.balanceOf(myAddress).call();
 
//   console.log(`Balance before send: ${balance} \n`);
  console.log("Balance before send: " + balanceof);
  
  var count = await web3.eth.getTransactionCount(myAddress);
  const gasPrice = await web3.eth.getGasPrice();
//   console.log(`gasPrice: ${gasPrice}\n`)
  console.log("gasPrice: "+ gasPrice)
  var gasLimit = 1000000;
  var transferAmount = 50;
  var chainId = 4;

  var rawTransaction = {
    "from": myAddress,
    /* "nonce": "0x" + count.toString(16),*/
    "nonce":  web3.utils.toHex(count),
    "gasPrice": web3.utils.toHex(gasPrice),
    "gasLimit": web3.utils.toHex(gasLimit),
    "to": contractAddress,
    "value": "0x0",
    "data": contract.methods.transfer(toAddress, transferAmount).encodeABI(),
    "chainId": chainId
};

var privateKey = new Buffer.from('7FA12852860D12815DF6FC120D7DF6EDC7029223E0B8725995FBCCE4F4F071CE', 'hex')
    var tx = new Tx(rawTransaction, {'chain':'rinkeby'});
    tx.sign(privateKey);
    var serializedTx = tx.serialize();

    var receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
    console.log("Receipt info: " + JSON.stringify(receipt, null));

    var balance = await contract.methods.balanceOf(myAddress).call();
    var balanceTwo = await contract.methods.balanceOf(toAddress).call();
  console.log("Balance after send: " + balance);
  console.log("Balance of addressTwo " + balanceTwo)

}

main()
