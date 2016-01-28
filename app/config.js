;(function() {

'use strict';

angular.module('App')
.constant('config',
  {
    app: {
      name:     'App Seed',
      desc:     'Angular application seed',
      version:  '0.0.1',
      versionCode: 0,
      organization: 'Organization Name',
      url: 'http://organization.com',
      package:  "com.example"
    },
    // Change the environment as your needs
    environment: 'production', // production, staging, testing, development
    TAG: 'SEED >> ',
    providers: {
      'data.provider': {
        localstorage: {
          driver: 'driver.name',
          db: 'dbname'
        },
        // sqlite: {
        //   driver; ''
        //   // data will be stored on device SQLite
        // },
        // memory: {
        //   // data would be removed when the app restart
        // }
      }
    },
    middlewares: [
      'controllerMiddleware',
      // 'authMiddleware'
    ],
    mapping: [ // modules are exists
      'user',
      'employee',
      'form'
    ]
  });

})();
