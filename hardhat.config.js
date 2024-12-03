module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 31337, // Hardhat's local chain ID
      mining: {
        auto: true, // Enable automatic mining
        interval: 0, // Mine immediately on transactions
      },
    },
    localhost: {
      url: "http://127.0.0.1:8545", // URL for the local Hardhat network
      chainId: 31337,
    },
    // baseMainnet: {
    //   url: "https://mainnet.base.org",
    //   chainId: 8453,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
    // baseSepolia: {
    //   url: "https://sepolia.base.org",
    //   chainId: 84532,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
  },
};
