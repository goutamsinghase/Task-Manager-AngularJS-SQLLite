'use strict';

module.exports = [
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                template: require('../templates/home.html'),
                controller: 'HomeController'
            });

        $urlRouterProvider.otherwise('/home');
    }
];
