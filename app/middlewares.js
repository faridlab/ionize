;(function() {

'use strict';

angular.module('App')

.service('controllerMiddleware', function controllerMiddleware($q, $location, config) {
  var
  defer = $q.defer(),
  path = $location.url(),
  maps = config.mapping,
  mod = path.split('/')[1];
  maps.unshift(''); // default home uri /
  if(maps.indexOf(mod) == -1) {
    $location.path('/notfound');
  }
  defer.resolve();
  return defer.promise;
})

.service('collectionMiddleware', function collectionMiddleware($q, $location, config) {
  var
  defer = $q.defer(),
  path = $location.url(),
  maps = config.mapping,
  mod = path.split('/')[1];
  maps.unshift(''); // default home uri /
  if(maps.indexOf(mod) == -1) {
    $location.path('/notfound');
  }
  defer.resolve();
  return defer.promise;
})

.service('authMiddleware', function authMiddleware($q, $location, userData, config) {
  var
  defer = $q.defer(),
  path = $location.url(),
  exclude = ['/user/login', '/user/register']; // exclude routes
  if((exclude.indexOf(path) > -1) || userData.get()) { // resolve
    defer.resolve();
  } else {
    if(!userData.get()) {
      var
      user = localStorage.getItem('user');
      if(user) {
        userData.set(JSON.parse(user));
        defer.resolve(JSON.parse(user));
      } else {
        $location.path('/user/login');
        defer.resolve();
      }
    } else {
      defer.resolve();
    }
  }
  return defer.promise;
});

})();
