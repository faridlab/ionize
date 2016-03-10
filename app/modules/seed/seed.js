;(function() {
'use strict';

var MOD = 'Seed'; // change module name as you need

angular.module(MOD, ['ngRoute']);
angular.module(MOD)

// .CONSTANT
.constant('const.'+MOD+'.route', [{
  uri: '/',
  option: {
    templateUrl: 'app/modules/seed/template/index.html',
    controller: MOD+'.home'
  }
},
{
  uri: '/:module/:id/add', // Routing for creating new item
  option: {
    templateUrl: 'app/modules/shared/template/add.html',
    controller: MOD+'.add'
  }
},
{
  uri: '/:module/:id/read', // Routing for reading detail item
  option: {
    templateUrl: 'app/modules/shared/template/read.html',
    controller: MOD+'.read'
  }
},
{
  uri: '/:module/:id/update', // Routing for updating the item by it's id
  option: {
    templateUrl: 'app/modules/shared/template/update.html',
    controller: MOD+'.update'
  }
},
{
  uri: '/:module/:id/delete', // Routing for deleting an item by it's id
  option: {
    templateUrl: 'app/modules/shared/template/delete.html',
    controller: MOD+'.delete'
  }
},
{
  uri: '/notfound',
  option: {
    templateUrl: 'app/modules/shared/template/404.html'
  }
},
{
  uri: '/:module',
  option: {
    templateUrl: 'app/modules/shared/template/search.html',
    controller: MOD+'.search'
  }
}
])
.constant('const.'+MOD+'.config', {
  collections: MOD
})

// .CONTROLLERS
.controller(MOD+'.home', [
  '$scope', '$routeParams', 'SchemaCollections', 'DataFactory',
  SeedHomeController
])


// .RUN
// initial your module dependencies
.run(function() {
  console.log('Seed module runnning...');
  // Do something right here, initial application open

});

function SeedHomeController($scope, $routeParams, Schema, DataFactory) {

  var
  self = $scope;
  self.title = $routeParams.module;
  self.module = 'crud';
  self.lists = DataFactory.get(self.module);

  $(".button-collapse").sideNav();
}

})();
