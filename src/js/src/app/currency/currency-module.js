module.exports = angular.module('currency-module', [])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/currency', {
                template: require('./currency.tpl.html'),
                title: 'Angular Banklet Example',
                controller: require('./currency-controller')
            });
    });