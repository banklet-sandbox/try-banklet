//src/js/src/lib/services/currency/currency-service.js
module.exports = function ($http, currencyListServiceUrl, afpCommons) {
    var extractData = afpCommons.util.extractData;
  
    return {
      getCurrencyList: getCurrencyList
    };
  
    function getCurrencyList() {
      return $http.get(currencyListServiceUrl, {cache:true}).then(extractData);
  
    }
  };
  