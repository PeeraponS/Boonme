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


var contractAddress = '0xE6DDDf979582a24Dd97E30b8034B30AA26D74cd9'
//studycampaign = 0x4E3f6f0cD87729C18A998A38128787bA0948413D
//sportcampaign = 0x367eBdEB73Bb9A53f58D5e46b7fc4D6cAD6Acf67
//0x4E3f6f0cD87729C18A998A38128787bA0948413D,0x367eBdEB73Bb9A53f58D5e46b7fc4D6cAD6Acf67
//,0xa4499d6Fb2CD019434d69ef4a3EFD32A2AE2060c,0x9d94393047c4a06d6e85134752D2E234355650C5
//0xE6DDDf979582a24Dd97E30b8034B30AA26D74cd9



checkToken(contractAddress);
checkName(contractAddress);
checkManager(contractAddress);
checkMaxamount(contractAddress);
checkBeneficiary(contractAddress);
checkReleaseTime(contractAddress);
