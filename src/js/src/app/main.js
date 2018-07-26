require('../../version.js');

// css entry point for webpack
require('./main.css');

require('@avaloq/afp-widgets/angular');

angular.module('app',
    [
        require('@avaloq/afp-widgets').name
    ])
    .config(function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
    });

require('./translations.js');
