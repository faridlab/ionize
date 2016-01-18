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
},
{
  url: '/form',
  option: {
    templateUrl: 'app/modules/seed/template/form.html',
    controller: MOD+'.form'
  }
}
])
.constant('const.'+MOD+'.config', {
  name: MOD
})


// .CONTROLLERS
.controller(MOD+'.home', [
  '$scope', '$log', '$q', '$http', '$routeParams', '$window', '$location', 'appConfig',
  SeedHomeController
])
.controller(MOD+'.form', [
  '$scope', '$log', '$q', '$http', '$routeParams', '$window', '$location', 'appConfig',
  FormController
])


// .RUN
// initial your module dependencies
.run(function() {
  console.log('Seed module runnning...');
  // Do something right here, initial application open

});

function SeedHomeController($scope, $log, $q, $http, $routeParams, $window, $location, appConfig) {

}

function FormController($scope, $log, $q, $http, $routeParams, $window, $location, appConfig) {

  $scope.forms = {
    id: "idformuser",
    name: "formuser",
    fields: [
      {
        id: 'first_name',
        name: 'first_name',
        value: null,
        label: 'First Name',
        type: 'text',
        placeholder: 'Your first name',
        required: true,
        readonly: false,
        disabled: false,
      },
      {
        id: 'mid_name',
        name: 'mid_name',
        value: null,
        label: 'Middle Name',
        type: 'text',
        placeholder: 'Middle name (optional)',
        required: false,
        readonly: false,
        disabled: false,
      },
      {
        id: 'last_name',
        name: 'last_name',
        value: null,
        label: 'Last Name',
        type: 'text',
        placeholder: 'Your last name',
        required: true,
        readonly: false,
        disabled: false,
      },
      {
        id: 'username',
        name: 'username',
        value: null,
        label: 'Create a username',
        type: 'text',
        placeholder: 'Username - [a-zA-Z0-9_.-]',
        required: true,
        readonly: false,
        disabled: false,
      },
      {
        id: 'password',
        name: 'password',
        value: null,
        label: 'Password',
        type: 'password',
        placeholder: 'Create a password',
        required: true,
        readonly: false,
        disabled: false,
      },
      {
        id: 'birthdate',
        name: 'birthdate',
        value: '',
        label: 'Birth day',
        type: 'birthdate',
        required: true,
        readonly: false,
        disabled: false,
      },
      {
        id: 'gender',
        name: 'gender',
        label: 'Gender',
        value: [
          // left value as default value
          {
            label: "Male",
            value: 'male'
          },
          // Right value as default value
          {
            label: "Female",
            value: 'female'
          }],
        type: 'switch',
        required: true,
        readonly: false,
        disabled: false,
      }
    ]
  };

}

})();
