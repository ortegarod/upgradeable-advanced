const Dogs = artifacts.require("Dogs");
const DogsUpdated = artifacts.require("DogsUpdated");
const Proxy = artifacts.require("Proxy");

module.exports = async function (deployer, network, accounts) {
    // deploy contracts
    const dogs = await Dogs.new();
    const proxy = await Proxy.new(dogs.address);
    const dogsUpdated = await DogsUpdated.new();

    // create proxyDog to fool Truffle
    var proxyDog = await Dogs.at(proxy.address);
    
    // set the nr of dogs through the proxy contract
    await proxyDog.setNumberOfDogs(10);
    
    // gets number of dogs from proxy contract storage
    var nrOfDogs = await proxyDog.getNumberOfDogs();
    console.log("Before update: " + nrOfDogs.toNumber());
    
    // tries to get number of dogs from dog contract - notice that it does not work because no storage in functional contract - returns 0
    nrOfDogs = await dogs.getNumberOfDogs();
    console.log("From wrong contract: " + nrOfDogs.toNumber());

    // update address to new functional DogsUpdated contract
    proxy.upgrade(dogsUpdated.address);

    // fool Truffle once again to think proxyDog has all functions
    proxyDog = await DogsUpdated.at(proxy.address);

    // initialize proxy state
    proxyDog.initialize(accounts[0]);

    // check that storage remained
    nrOfDogs = await proxyDog.getNumberOfDogs();
    console.log("After update: " + nrOfDogs.toNumber());
    
    // set the nr of dogs through the proxy with the new functional contract
    await proxyDog.setNumberOfDogs(30);

    // gets number of dogs from proxy contract storage after 2nd update - check if works with new functional contract
    nrOfDogs = await proxyDog.getNumberOfDogs();
    console.log("After change: " + nrOfDogs.toNumber());

}