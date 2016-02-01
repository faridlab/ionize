;(function() {
'use strict';

var MOD = 'Seed'; // change module name as you need
angular.module(MOD)

// .CONTROLLERS
.controller(MOD+'.search', [
  '$scope', '$routeParams', 'SchemaCollections', 'DataFactory',
  SeedSearch
])
.controller(MOD+'.add', [
  '$scope', '$routeParams', 'SchemaCollections', 'DataFactory', '$location',
  SeedCreate
])
.controller(MOD+'.read', [
  '$scope', '$routeParams', 'DataFactory',
  SeedRead
])
.controller(MOD+'.update', [
  '$scope', '$routeParams', 'DataFactory', '$location',
  SeedUpdate
])
.controller(MOD+'.delete', [
  '$scope', '$routeParams', 'DataFactory', '$location',
  SeedDelete
]);


function SeedSearch($scope, $routeParams, Schema, DataFactory) {
  var
  self = $scope;
  self.title = $routeParams.module;
  self.module = $routeParams.module;
  self.lists = DataFactory.get(self.module);

}

function SeedCreate($scope, $routeParams, Schema, DataFactory, $location) {
  var
  self = $scope;

  self.title = "New " + $routeParams.module;
  self.module = $routeParams.module;

  $scope.forms = {};
  if(Schema.collections($routeParams.module)) { // ensure that collections is exists
    $scope.forms = Schema.generate();
  }

  $scope.onSubmit = function onSubmit() {
    Schema.fetch($scope.forms.fields)
    .then(function(collections) {
      DataFactory.add(self.module, collections);
      $location.path('/'+self.module);
    }, function(err) {
      console.log(err);
    });
  }

}

function SeedRead($scope, $routeParams, DataFactory) {
  var
  self = $scope;
  self.title = $routeParams.module +" #"+$routeParams.id;
  self.module = $routeParams.module;
  self.id = $routeParams.id;
  self.fields = DataFactory.get(self.module, self.id);
}

function SeedUpdate($scope, $routeParams, DataFactory, $location) {
  var
  self = $scope;
  self.title = 'Update ' + $routeParams.module +" #"+$routeParams.id;
  self.module = $routeParams.module;
  self.id = $routeParams.id;
  self.fields = DataFactory.get(self.module, self.id);
  self.onUpdate = function(){
    DataFactory.set(self.module, self.id, self.fields);
    $location.path(self.module);
  }
}

function SeedDelete($scope, $routeParams, DataFactory, $location) {
  var
  self = $scope;
  self.title = 'Update ' + $routeParams.module +" #"+$routeParams.id;
  self.module = $routeParams.module;
  self.id = $routeParams.id;
  DataFactory.delete(self.module, self.id);
  $location.path(self.module);
}

})();
