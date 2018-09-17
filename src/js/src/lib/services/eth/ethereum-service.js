//src/js/src/lib/services/eth/ethereum-service.js
module.exports = function ($q, afpCommons) {
    var extractData = afpCommons.util.extractData;
    const Web3 = require('web3');
    var web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider("https://mainnet.infura.io")); 
    var jsonAbi = require("./erc20-abi.json");
    return {
      getTokenList: getTokenList,
      getBalance: getBalance,
      getBalanceSheet: getBalanceSheet
    };

    function getTokenList() {
      var defered = $q.defer();
      defered.resolve([
        {name: "ETH", address: null},
        {name: "DAI", address: "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359"},
        {name: "RLC", address: "0x607F4C5BB672230e8672085532f7e901544a7375"},
        {name: "SONM", address: "0x983F6d60db79ea8cA4eB9968C6aFf8cfA04B3c63"},
        {name: "ZRX", address: "0xE41d2489571d322189246DaFA5ebDe1F4699F498"}
      ]);
      return defered.promise;
    }

    function getBalanceSheet(account) {
      return getTokenList().then(
        function(tokObjects) { 
          return $q.all(_.map(tokObjects, function(tokObj) {
            return getBalance(account, tokObj.address);
          }))
          .then(
            function (bals) {
              return bals.map(function (bal, i) {
                return {name: tokObjects[i].name, address: tokObjects[i].address, balance: bal};
              }
          )});
        }
      )
    }

    function getDecimals(token) {
      return new web3.eth.Contract(jsonAbi, token).methods.decimals()
        .call()
        .catch(function(e) {return 1});
    }

    function getBalance(account, token) {
      if (!token) {
        return web3.eth.getBalance(account)
          .then(function(bn) {
            return  bn / Math.pow(10, 18);
          });

      } else {
        let contract =  new web3.eth.Contract(jsonAbi, token); 
        return contract.methods.balanceOf(account).call()
        .then(function(bn) {
          return getDecimals(token)
            .then(function (decimals) {
              return  bn / Math.pow(10, decimals);
            })
        });
      }
    }
  };
  