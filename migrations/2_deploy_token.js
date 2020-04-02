// const Token = artifacts.require("Token");

// module.exports = function(deployer) {
//   deployer.deploy(Token);
// };

var Token = artifacts.require("Token");
module.exports = function(deployer, network, accounts) {
 deployer.deploy(Token,{from: accounts[0]});
};
