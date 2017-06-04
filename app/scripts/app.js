'use strict';

angular.module('app', [
    'ui.router',
    'ui.bootstrap',
    'ngSQLite',
    require('./modules').name,
  ])
  .constant('DB_CONFIG', {
        task: {
            id: 'key',
            name: { type: 'text'}
        }
    })
  .run([
    '$rootScope',
    '$state',
    '$SQLite',
    'DB_CONFIG',
    function($rootScope, $state,$SQLite, DB_CONFIG) {
      console.log('main entry');
      $SQLite.dbConfig({
        name: 'SQLite',
        description: 'SQLite DB',
        version: '1.0'
      });

      $SQLite.init(function (init) {
            angular.forEach(DB_CONFIG, function (config, name) {
                // console.log('name',name);
                // console.log('config', config);
                init.step();
                $SQLite.createTable(name, config).then(init.done);
            });
            init.finish();
        });
    }
  ]);
