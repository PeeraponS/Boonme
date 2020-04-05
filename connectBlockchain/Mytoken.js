const Web3 = require("web3");
const chalk = require("chalk");
const endPointUrl = "https://rinkeby.infura.io/v3/991d6c0c5fd54ee4bac60feed128dffd";

console.log(chalk.blue(`Endpoint: ${endPointUrl}`));
const web3 = new Web3(endPointUrl);

const contractABI = require("/12-3-2020/build/contracts/Token.json")
const contractAddress = "0x781ef4089546DAB8BA04734061327a8Fa8764c12";


const contract = new web3.eth.Contract(contractABI.abi, contractAddress)

// console.log(contractABI.abi)

const checkName = async () => {
    
    const contract = new web3.eth.Contract(contractABI.abi, contractAddress);
    try{
        contract.methods.name().call((err, result) => {
            if (err) console.log(chalk.red(err));
            else console.log(chalk.yellow(result));
        })
    } catch (err) {
        console.log(err.message);
    }
}; 

const checkSymbol = async () => {
    
    const contract = new web3.eth.Contract(contractABI.abi, contractAddress);
    try{
        contract.methods.symbol().call((err, result) => {
            if (err) console.log(chalk.red(err));
            else console.log(chalk.yellow(result));
        })
    } catch (err) {
        console.log(err.message);
    }
}; 

const checkDecimals = async () => {
    
    const contract = new web3.eth.Contract(contractABI.abi, contractAddress);
    try{
        contract.methods.decimals().call((err, result) => {
            if (err) console.log(chalk.red(err));
            else console.log(chalk.yellow(result));
        })
    } catch (err) {
        console.log(err.message);
    }
}; 

const checkBalance = async choosedAccount => {
    // const pethAccount = "0x9DBd4ECf641a51b741724D1078032E6F03F00a73";
    
    // Check Balance
    const contract = new web3.eth.Contract(contractABI.abi, contractAddress);
    try {
        contract.methods.balanceOf(choosedAccount).call((err, result) => {
            if (err) console.log(chalk.red(err));
            else console.log(chalk.yellow(result));
        });
    } catch (err) {
        console.log(err.message);
    }
}; 

const totalSupply = async () => {

    const contract = new web3.eth.Contract(contractABI.abi, contractAddress);
    try {
        contract.methods.totalSupply().call((err, result) => {
            if (err) console.log(chalk.red(err));
            else console.log(chalk.yellow(result));
        });
    } catch (err) {
        console.log(err.message);
    }
}

var addressto = "0x9DBd4ECf641a51b741724D1078032E6F03F00a73";
var addressRecipient = "0xB1e379A0e35382cd579Ae8f181C1ff21B112a6C9";


    // checkName()
    // checkSymbol()
    // checkDecimals()
    // totalSupply()
    checkBalance("0xE6DDDf979582a24Dd97E30b8034B30AA26D74cd9")