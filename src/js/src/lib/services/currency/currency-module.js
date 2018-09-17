//src/js/src/lib/services/currency/currency-module.js
module.exports =
angular.module('services.currency', [])
  .factory('currencyService', require('./currency-service'))
  .factory('ethereumService', require('./ethereum-service'))

