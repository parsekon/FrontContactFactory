"use strict";

require("@nomicfoundation/hardhat-toolbox");

require('@nomiclabs/hardhat-etherscan');
/** @type import('hardhat/config').HardhatUserConfig */


module.exports = {
  solidity: "0.8.10",
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/12187ae9826147799c5e4c804b69f801",
      //Infura url with projectId
      accounts: ["9df5acf288656e320378fe171be9b0538d9f89d9a5fd59219439bcc5ef5d4436"] // add the account that will deploy the contract (private key)

    }
  },
  etherscan: {
    apiKey: "G32J1UPYT6UR59JUXYFD84353IF5XB16YT"
  }
};