require('../../version.js');

// css entry point for webpack
require('./main.css');

require('@avaloq/afp-widgets/angular');
//require('web3');

angular.module('app',
    [
        require('@avaloq/afp-widgets').name,
        require('./config/config-module').name,
        require('../lib/services/currency/currency-module').name,
        require('./currency/currency-module').name,
        require('./eth/eth-module').name
    ])
    .config(function ($routeProvider) {
        console.log("routeProvider", $routeProvider);
        $routeProvider.otherwise({redirectTo: '/eth'});
    });

require('./translations.js');
