// ignition/modules/FaucetModule.js

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("FaucetModule", (m) => {
  const token = m.contract("MyToken", ["1000000000000000000000000"]); // 1 million tokens
  const faucet = m.contract("Faucet", [token]);

  return { token, faucet };
});
