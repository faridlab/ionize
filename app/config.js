;(function() {

'use strict';

angular.module('AppSeed')
.constant('appConfig',
  {
    name:     'App Seed',
    desc:     'Angular application seed',
    version:  '0.0.1',
    versionCode: 0,
    organization: 'Organization Name',
    url: 'http://organization.com',
    package:  "com.example",
    // Change the environment as your needs
    environment: 'production', // production, staging, testing, development
    TAG: 'SEED >> ',
    db: {
      name:     'app.db',
      version:  1,
      scheme:   '0.0.1',
      logs:    [{1: '0.0.1'}],
      schemes: {
        '0.0.1': [
          'CREATE TABLE IF NOT EXISTS table_name       (id INTEGER PRIMARY KEY, column_name TEXT, column_name INTEGER)'
        ]
      },
      collections: {}
    },

    path: {
      production: 'http://production.com/api',
      staging: null,
      testing: null,
      development: 'http://development.com/api',
      bundle: 'http://bundle.com/api',
    },

    api: function(path, param) {
      var
      split = path.split('.'),
      res = this.uri,
      env = this.environment,
      _param;

      for (var i = 0; i < split.length; i++) {
        res = res[split[i]];
      }

      if(param){
        if(typeof param === 'string') { // use as param
          _param = param;
        } else{ // as object
          if(param.env) env = param.env;
          if(param.param) _param = param.param;
        }
      }

      var
      uri = this.path[env] + res;
      if(_param) {
        return uri.concat('/', param);
      }
      return uri;
    },

    uri: {
      user: {
        login:   '/user/login',
        register:   '/user/register',
        logout:   '/user/logout'
      }
    }
  })

// set depedencies as you need from another module
.config([
  '$routeProvider',
  'const.Seed.route',
  'const.User.route',

  function($routeProvider, seedRouter, userRouter) {

    var
    param = [];
    param = param.concat(seedRouter);
    param = param.concat(userRouter);

    for (var i in param) {
      $routeProvider.when(param[i].url, param[i].option);
    }

    $routeProvider.otherwise({redirectTo: '/notfound'});

}]);

})();