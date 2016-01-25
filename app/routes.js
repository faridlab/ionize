;(function() {

'use strict';

angular.module('App')
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
