module.exports = angular.module('eth-module', [])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/eth', {
                template: require('./eth.tpl.html'),
                title: 'Angular Banklet Ethereum Example',
                controller: require('./eth-controller')
            });
    });