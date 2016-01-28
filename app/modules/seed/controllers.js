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
  if(Schema.collections($routeParams.module)) { // ensure that collections is exists
    self.forms = Schema.fetch();
    console.log(self.forms);
  }
  // console.log(Schema.get('$routeParams.module'));
}

function SeedRead($scope, $routeParams) {

}

function SeedUpdate($scope, $routeParams) {

}

function SeedDelete($scope, $routeParams) {

}

})();
