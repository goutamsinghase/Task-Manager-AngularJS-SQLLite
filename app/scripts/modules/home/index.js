'use strict';

module.exports = angular.module('app.modules.home', [])
    .config(require('./router/router'))
    .controller('HomeController', require('./controllers/home-controller'))
    .run([
        '$rootScope',
        '$state',
        function($rootScope, $state) {
            console.log('home entry');
        }
    ]);
