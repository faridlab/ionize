;(function() {

'use strict';

angular.module('App')
// set depedencies as you need from another module
.config([
  '$routeProvider',
  'const.Seed.route',
  'const.User.route',
  'config',

  function($routeProvider, seedRouter, userRouter, config) {
    var
    routes = [];
    routes = routes.concat(userRouter);
    routes = routes.concat(seedRouter);

    for (var i in routes) {
      var
      option = routes[i].option;
      option.resolve = config.middlewares;
      $routeProvider.when(routes[i].uri, option);
    }

    $routeProvider.otherwise({redirectTo: '/notfound'});

}]);

})();
