;(function() {

'use strict';

angular.module('App')
.factory('api', ['config', function apiFactory(config) {

  var
  api = {
    path: {
      production: 'http://production.com/api',
      staging: null,
      testing: null,
      development: 'http://development.com/api',
      bundle: 'http://bundle.com/api',
    },

    uri: {
      user: {
        login:   '/user/login',
        register:   '/user/register',
        logout:   '/user/logout'
      }
    }
  };

  function getApi(path, param) {
    var
    split = path.split('.'),
    res = api.uri,
    env = config.environment,
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
    uri = api.path[env] + res;
    if(_param) {
      return uri.concat('/', param);
    }
    return uri;
  }
  return getApi;
}]);

})();
