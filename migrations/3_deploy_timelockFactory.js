// const TimelockFactory = artifacts.require("TimelockFactory");

// module.exports = function(deployer) {
//   deployer.deploy(TimelockFactory);
// };

var TimelockFactory = artifacts.require("TimelockFactory");
module.exports = function(deployer) {
 deployer.deploy(TimelockFactory);
};
