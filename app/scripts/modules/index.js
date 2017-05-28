'use strict';

module.exports = angular.module('app.modules', [
	require('./home').name])
    .run([
        '$rootScope',
        '$state',
        function($rootScope, $state) {
            console.log('home entry');
        }
    ]);
