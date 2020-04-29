const Web3 = require("web3");
const chalk = require("chalk");
require("dotenv").config();

const endPointUrl =
  "https://rinkeby.infura.io/v3/991d6c0c5fd54ee4bac60feed128dffd";
var Tx = require("ethereumjs-tx").Transaction;

console.log(chalk.blue(`Endpoint: ${endPointUrl}`));
const web3 = new Web3(endPointUrl);

var myAddress = process.env.MANAGER_ADDRESS;
const privateKeyOne = Buffer.from(process.env.MANAGER_PRIVATEKEY, "hex");

const contractABI = require("../build/contracts/TimelockFactory.json");
var contractAddress = "0x48D127F36B48aFBd2E9A22001437644C393158F9";

const createCampaign = async (
  _token,
  _nameCampaign,
  _beneficiary,
  _releaseTime,
  _maxamount
) => {
  console.log("In createCampaign");
  console.log(_token);
  console.log(_nameCampaign);
  console.log(_beneficiary);
  console.log(_releaseTime);
  console.log(_maxamount);
  var balance = await web3.eth.getBalance(myAddress);

  console.log("Balance ETH: " + balance);

  var contract = new web3.eth.Contract(contractABI.abi, contractAddress, {
    from: myAddress,
  });

  var count = await web3.eth.getTransactionCount(myAddress);
  const gasPrice = await web3.eth.getGasPrice();

  console.log("gasPrice: " + gasPrice);
  var gasLimit = 1000000;
  var chainId = 4;

  var rawTransaction = {
    from: myAddress,
    /* "nonce": "0x" + count.toString(16),*/
    nonce: web3.utils.toHex(count),
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex(gasLimit),
    to: contractAddress,
    value: "0x0",
    data: contract.methods
      .createCampaign(
        _token,
        _nameCampaign,
        _beneficiary,
        _releaseTime,
        _maxamount
      )
      .encodeABI(),
    chainId: chainId,
  };

  var tx = new Tx(rawTransaction, { chain: "rinkeby" });
  tx.sign(privateKeyOne);
  var serializedTx = tx.serialize();

  var receipt = await web3.eth.sendSignedTransaction(
    "0x" + serializedTx.toString("hex")
  );
  console.log("Receipt info: " + JSON.stringify(receipt, null));
  console.log("success create");
};

const getDeployed = async () => {
  const contract = new web3.eth.Contract(contractABI.abi, contractAddress);
  try {
    return contract.methods.getDeployedCampaigns().call((err, results) => {
      if (err) console.log(chalk.red(err));
      else {
        return results;
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};

const findCampaign = async (choosedorderCampaign) => {
  const contract = new web3.eth.Contract(contractABI.abi, contractAddress);
  try {
    contract.methods
      .deployedCampaigns(choosedorderCampaign)
      .call((err, result) => {
        if (err) console.log(chalk.red(err));
        else console.log(chalk.blueBright(result));
      });
  } catch (err) {
    console.log(err.message);
  }
};

// var _nameCampaign = "น้ำท่วมร่วมใจ3";
// var _beneficiary = "0x8233E9e38f5b13A97675f87D01262395901C58B8";
// var _releaseTime = "1586956813";
// var _maxamount = "50000";

// createCampaign(
//   process.env.ERC20TOKEN_CONTRACT_ADDRESS,
//   _nameCampaign,
//   _beneficiary,
//   _releaseTime,
//   _maxamount
// );
// getDeployed();

registerCampaign = async (
  nameCampaign,
  beneficiary,
  releaseTime,
  maxamount
) => {
  // let _nameCampaign = "ไฟไหม้ร่วมใจ";
  // let _beneficiary = "0x8233E9e38f5b13A97675f87D01262395901C58B8";
  // let _releaseTime = "1586956813";
  // let _maxamount = "50000";
  console.log("In Register Campaign");
  console.log(nameCampaign);
  console.log(beneficiary);
  console.log(releaseTime);
  console.log(maxamount);

  try {
    await createCampaign(
      process.env.ERC20TOKEN_CONTRACT_ADDRESS,
      nameCampaign,
      beneficiary,
      releaseTime,
      maxamount
    );
    const deployedCampaign = await getDeployed();
    return deployedCampaign[deployedCampaign.length - 1];
  } catch (error) {
    console.log(chalk.red(error.message));
  }
};
// registerCampaign();
// findCampaign(0);

//adress campaign =
//          [0]   = 0x69A17c8fAbA2cF41Afc5F5874A487b844D5Cf9E7

module.exports = {
  registerCampaign,
};
