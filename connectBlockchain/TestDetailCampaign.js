const Web3 = require("web3");
const chalk = require("chalk");
const endPointUrl = "https://rinkeby.infura.io/v3/991d6c0c5fd54ee4bac60feed128dffd";
var Tx = require('ethereumjs-tx').Transaction;

console.log(chalk.blue(`Endpoint: ${endPointUrl}`));
const web3 = new Web3(endPointUrl);

const contractABI = require("/12-3-2020/build/contracts/TimelockToken.json")


const contract = new web3.eth.Contract(contractABI.abi, contractAddress)


const checkToken = async contractAddress => {
    
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


const checkName = async contractAddress => {
    
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


const checkManager = async contractAddress => {
    
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


const checkMaxamount = async contractAddress => {
    
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


const checkBeneficiary = async contractAddress => {
    
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


const checkReleaseTime = async contractAddress => {
    
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


var contractAddress = '0x69A17c8fAbA2cF41Afc5F5874A487b844D5Cf9E7'
//adress campaign = 
//          [0]   = 0x69A17c8fAbA2cF41Afc5F5874A487b844D5Cf9E7



checkToken(contractAddress);
checkName(contractAddress);
checkManager(contractAddress);
checkMaxamount(contractAddress);
checkBeneficiary(contractAddress);
checkReleaseTime(contractAddress);
