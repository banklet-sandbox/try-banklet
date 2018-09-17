//initialize  constants such as REST base urls in this file.
module.exports = 
angular.module('app.config', [])
  .value(
    'currencyListServiceUrl',
    '../../com.avaloq.afs.rest.services/rest/baseBankData/currencyList'
  )