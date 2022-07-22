const path = require("path");
const fs = require("fs");
const HdWalletProvider = require('truffle-hdwallet-provider');

const secret = JSON.parse(fs.readFileSync('./secrets').toString().trim());

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  },

  // https://ropsten.infura.io/v3/80f293a556db4a9d9e3040d0a13edbfa
  networks: {
    develop: {
      port: 8545,
    }, 
    ropsten: {
      // provider: () => (
        
      // ),
      networkId: 3
    }
  }, 
};
