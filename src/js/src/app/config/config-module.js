//initialize  constants such as REST base urls in this file.
module.exports = 
angular.module('app.config', [])
  .value(
    'currencyListServiceUrl',
    '../../com.avaloq.afs.rest.services/rest/baseBankData/currencyList'
  )
  .value('defaultEthAccount', "0xfE9e8709d3215310075d67E3ed32A380CCf451C8")