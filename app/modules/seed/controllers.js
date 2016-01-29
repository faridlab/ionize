;(function() {
'use strict';

var MOD = 'Seed'; // change module name as you need
angular.module(MOD)

// .CONTROLLERS
.controller(MOD+'.add', [
  '$scope', '$routeParams', 'SchemaCollections',
  SeedCreate
])
.controller(MOD+'.read', [
  '$scope', '$routeParams',
  SeedRead
])
.controller(MOD+'.update', [
  '$scope', '$routeParams',
  SeedUpdate
])
.controller(MOD+'.delete', [
  '$scope', '$routeParams',
  SeedDelete
]);

function SeedCreate($scope, $routeParams, Schema) {
  var
  self = $scope;

  self.title = "New " + $routeParams.module;
  $scope.forms = {};
  if(Schema.collections($routeParams.module)) { // ensure that collections is exists
    $scope.forms = Schema.fetch();
  }

  $scope.onSubmit = function onSubmit() {
    console.log('submitting...');
    alert(2345564543523);
  }

}

function SeedRead($scope, $routeParams) {

}

function SeedUpdate($scope, $routeParams) {

}

function SeedDelete($scope, $routeParams) {

}

})();
