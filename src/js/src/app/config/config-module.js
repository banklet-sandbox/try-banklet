//initialize  constants such as REST base urls in this file.
module.exports = 
angular.module('app.config', [])
  .value('defaultEthAccount', "0xfE9e8709d3215310075d67E3ed32A380CCf451C8")
  .value('defaultErc20Tokens', [
    {name: "ETH", address: null},
    {name: "DAI", address: "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359"},
    {name: "RLC", address: "0x607F4C5BB672230e8672085532f7e901544a7375"},
    {name: "SONM", address: "0x983F6d60db79ea8cA4eB9968C6aFf8cfA04B3c63"},
    {name: "ZRX", address: "0xE41d2489571d322189246DaFA5ebDe1F4699F498"}
  ])