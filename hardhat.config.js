require("dotenv").config()

require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")
//const { developmentChains } = require("helper-hardhat-config")

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const rinkebyURL = process.env.RINKEBY_RPC_URL || ""
const privateKey =
    process.env.PRIVATE_KEY ||
    "b59f502c8a7e6d23d9030b472e6435d95048de5e86028a521432def2e2561feb"
//const etherscanApiKey = process.env.ETHERSCAN_API_KEY
const coinmarketcapkey = process.env.COINMARKETCAP_API_KEY || ""
module.exports = {
    //solidity: "0.8.8",
    solidity: {
        compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
    },
    defaultNetwork: "hardhat",
    networks: {
        Rinkeby: {
            url: rinkebyURL,
            accounts: [privateKey],
            chainId: 4,
            blockConfirmations: 6,
        },
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        currency: "USD",
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },

    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
        },
    },

    gasReporter: {
        enabled: true,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: coinmarketcapkey,
        token: "MATIC",
    },
}
