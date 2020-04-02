const Web3 = require("web3");
const chalk = require("chalk");
const endPointUrl = "https://rinkeby.infura.io/v3/991d6c0c5fd54ee4bac60feed128dffd";
var Tx = require('ethereumjs-tx').Transaction;

console.log(chalk.blue(`Endpoint: ${endPointUrl}`));
const web3 = new Web3(endPointUrl);

const contractABI = require("/12-3-2020/build/contracts/TimelockToken.json")
var myAddress = "0x9DBd4ECf641a51b741724D1078032E6F03F00a73"
const privateKeyOne = Buffer.from("7FA12852860D12815DF6FC120D7DF6EDC7029223E0B8725995FBCCE4F4F071CE", "hex");
var toAddress = "0xB1e379A0e35382cd579Ae8f181C1ff21B112a6C9"
const privateKeyTwo = Buffer.from("83a0081abc7ef41202bb691ccb6de8e34677a763fad5cae57fbdb9c0e3803964", "hex");
var contractAddress = '0x4E3f6f0cD87729C18A998A38128787bA0948413D'
//studycampaign = 0x4E3f6f0cD87729C18A998A38128787bA0948413D
//sportcampaign = 0x367eBdEB73Bb9A53f58D5e46b7fc4D6cAD6Acf67
// 0x4E3f6f0cD87729C18A998A38128787bA0948413D,0x367eBdEB73Bb9A53f58D5e46b7fc4D6cAD6Acf67

const contract = new web3.eth.Contract(contractABI.abi, contractAddress)


const checkToken = async () => {
    
    const contract = new web3.eth.Contract(contractABI.abi, contractAddress);
    try{
        contract.methods.token().call((err, result) => {
            if (err) console.log(chalk.red(err));
            else console.log(chalk.yellow(result));
        })
    } catch (err) {
        console.log(err.message);
    }
};


const checkName = async () => {
    
    const contract = new web3.eth.Contract(contractABI.abi, contractAddress);
    try{
        contract.methods.nameCampaign().call((err, result) => {
            if (err) console.log(chalk.red(err));
            else console.log(chalk.yellow(result));
        })
    } catch (err) {
        console.log(err.message);
    }
};


const checkManager = async () => {
    
    const contract = new web3.eth.Contract(contractABI.abi, contractAddress);
    try{
        contract.methods.creater().call((err, result) => {
            if (err) console.log(chalk.red(err));
            else console.log(chalk.yellow(result));
        })
    } catch (err) {
        console.log(err.message);
    }
};


const checkMaxamount = async () => {
    
    const contract = new web3.eth.Contract(contractABI.abi, contractAddress);
    try{
        contract.methods.maxamount().call((err, result) => {
            if (err) console.log(chalk.red(err));
            else console.log(chalk.yellow(result));
        })
    } catch (err) {
        console.log(err.message);
    }
};


const checkBeneficiary = async () => {
    
    const contract = new web3.eth.Contract(contractABI.abi, contractAddress);
    try{
        contract.methods.beneficiary().call((err, result) => {
            if (err) console.log(chalk.red(err));
            else console.log(chalk.yellow(result));
        })
    } catch (err) {
        console.log(err.message);
    }
};


const checkReleaseTime = async () => {
    
    const contract = new web3.eth.Contract(contractABI.abi, contractAddress);
    try{
        contract.methods.releaseTime().call((err, result) => {
            if (err) console.log(chalk.red(err));
            else console.log(chalk.yellow(result));
        })
    } catch (err) {
        console.log(err.message);
    }
};

const Release = async () => {
    
    const contract = new web3.eth.Contract(contractABI.abi, contractAddress);
    try{
        contract.methods.release().call((err, result) => {
            if (err) console.log(chalk.red(err));
            else console.log(chalk.yellow(result));
        })
    } catch (err) {
        console.log(err.message);
    }
};

// checkToken();
// checkName();
// checkBeneficiary();
// checkReleaseTime();
// checkMaxamount();
// checkManager();
Release();