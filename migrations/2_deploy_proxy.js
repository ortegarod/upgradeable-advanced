const Dogs = artifacts.require("Dogs");
const Proxy = artifacts.require("Proxy");

module.exports = async function (deployer, network, accounts) {
    const dogs = await Dogs.new();
    const proxy = await Proxy.new(dogs.address);
  };
