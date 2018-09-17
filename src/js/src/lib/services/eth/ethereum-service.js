//src/js/src/lib/services/eth/ethereum-service.js
module.exports = function ($q, afpCommons, defaultErc20Tokens) {
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
      defered.resolve(defaultErc20Tokens);
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
  