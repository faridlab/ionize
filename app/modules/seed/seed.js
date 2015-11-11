;(function() {
'use strict';

var MOD = 'Seed'; // change module name as you need

angular.module(MOD, ['ngRoute']);

angular.module(MOD)


// .CONSTANT
.constant('const.'+MOD+'.route', [{
  url: '/',
  option: {
    templateUrl: 'app/modules/seed/template/index.html',
    controller: MOD+'.home'
  }
}])
.constant('const.'+MOD+'.config', {
  name: MOD
})


// .CONTROLLERS
.controller(MOD+'.home', [
  '$scope', '$log', '$q', '$http', '$routeParams', '$window', '$location', 'appConfig',
  SeedHomeController
])


// .RUN
// initial your module dependencies
.run(function() {
  console.log('Seed module runnning...');
  // Do something right here, initial application open

});

function SeedHomeController($scope, $log, $q, $http, $routeParams, $window, $location, appConfig) {

}

})();