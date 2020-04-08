const Web3 = require("web3");
const chalk = require("chalk");
const endPointUrl =
  "https://rinkeby.infura.io/v3/991d6c0c5fd54ee4bac60feed128dffd";
var Tx = require("ethereumjs-tx").Transaction;

console.log(chalk.blue(`Endpoint: ${endPointUrl}`));
const web3 = new Web3(endPointUrl);

var myAddress = "0x9DBd4ECf641a51b741724D1078032E6F03F00a73";
const privateKeyOne = Buffer.from(
  "7FA12852860D12815DF6FC120D7DF6EDC7029223E0B8725995FBCCE4F4F071CE",
  "hex"
);

const contractABI = require("/12-3-2020/build/contracts/TimelockFactory.json");
var contractAddress = "0x48D127F36B48aFBd2E9A22001437644C393158F9";
//contracttest1 = "0xD26eA93161682E25Be07338236462185fA711961"
//contracttest2 = "0x48D127F36B48aFBd2E9A22001437644C393158F9"

// //_token, _nameCampaign, _beneficiary, _releaseTime, _maxamount
// const createCampaign = async (
//   _token,
//   _nameCampaign,
//   _beneficiary,
//   _releaseTime,
//   _maxamount
// ) => {
//   var balance = await web3.eth.getBalance(myAddress);

//   console.log("Balance ETH: " + balance);

//   var contract = new web3.eth.Contract(contractABI.abi, contractAddress, {
//     from: myAddress,
//   });

//   var count = await web3.eth.getTransactionCount(myAddress);
//   const gasPrice = await web3.eth.getGasPrice();

//   console.log("gasPrice: " + gasPrice);
//   var gasLimit = 1000000;
//   var chainId = 4;

//   var rawTransaction = {
//     from: myAddress,
//     /* "nonce": "0x" + count.toString(16),*/
//     nonce: web3.utils.toHex(count),
//     gasPrice: web3.utils.toHex(gasPrice),
//     gasLimit: web3.utils.toHex(gasLimit),
//     to: contractAddress,
//     value: "0x0",
//     data: contract.methods
//       .createCampaign(
//         _token,
//         _nameCampaign,
//         _beneficiary,
//         _releaseTime,
//         _maxamount
//       )
//       .encodeABI(),
//     chainId: chainId,
//   };

//   var tx = new Tx(rawTransaction, { chain: "rinkeby" });
//   tx.sign(privateKeyOne);
//   var serializedTx = tx.serialize();

//   var receipt = await web3.eth.sendSignedTransaction(
//     "0x" + serializedTx.toString("hex")
//   );
//   console.log("Receipt info: " + JSON.stringify(receipt, null));
//   console.log("success create");
// };

const createCampaign = async (
  _nameCampaign,
  _beneficiary,
  _releaseTime,
  _maxamount
) => {
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
        process.env.TOKEN_ADDRESS,
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
    contract.methods.getDeployedCampaigns().call((err, result) => {
      if (err) console.log(chalk.red(err));
      else console.log(chalk.yellow(result));
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
        else console.log(chalk.yellow(result));
      });
  } catch (err) {
    console.log(err.message);
  }
};

var _token = "0xE4289B1DdDc2d8F678c4431C240A9940f0B69e70";
var _nameCampaign = "Test1";
var _beneficiary = "0x8233E9e38f5b13A97675f87D01262395901C58B8";
var _releaseTime = "1586083258";
var _maxamount = "10000";

// createCampaign(_nameCampaign, _beneficiary, _releaseTime, _maxamount);
getDeployed();
// findCampaign(0);

//adress campaign =
//          [0]   = 0x69A17c8fAbA2cF41Afc5F5874A487b844D5Cf9E7
