'use strict';

angular.module('app', [
        'ui.router',
        'ui.bootstrap',
        require('./modules').name,
    ])
    .run([
        '$rootScope',
        '$state',
        function($rootScope, $state) {
            console.log('main entry');
        }
    ]);
