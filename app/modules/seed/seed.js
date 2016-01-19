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
        id: 'email',
        name: 'email',
        value: null,
        label: 'Your email',
        type: 'email',
        placeholder: 'youremail@mail.com',
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
      },
      {
        id: 'siblings',
        name: 'siblings',
        value: null,
        label: 'How many your siblings?',
        type: 'number',
        placeholder: 'number of your siblings (Optional)',
        required: false,
        readonly: false,
        disabled: false,
      },
      {
        id: 'graduate',
        name: 'graduate',
        label: 'Your last graduate',
        value: [
          {
            label: "High School",
            value: 1
          },
          {
            label: "Bachelor",
            value: 2
          },
          {
            label: "Masters",
            value: 3
          },
          {
            label: "Ph.D",
            value: 4
          },
        ],
        type: 'select',
        placeholder: "-- Graduate --",
        required: false,
        readonly: false,
        disabled: false,
      },
      {
        id: 'likes',
        name: 'likes',
        label: 'Which one you like most?',
        value: [
          {
            label: "Bakso",
            value: 1
          },
          {
            label: "Indomie",
            value: 2
          },
          {
            label: "Mie Ayam",
            value: 3
          },
          {
            label: "Gratisan",
            value: 4
          },
        ],
        type: 'radio',
        required: false,
        readonly: false,
        disabled: false,
      },
      {
        id: 'hobbies',
        name: 'hobbies',
        label: 'Your hobbies?',
        value: [
          {
            label: "Reading",
            value: 1
          },
          {
            label: "Eating",
            value: 2
          },
          {
            label: "Sleeping",
            value: 3
          },
          {
            label: "Walking around",
            value: 4
          },
        ],
        type: 'checkbox',
        required: false,
        readonly: false,
        disabled: false,
      },
      {
        id: 'biodata',
        name: 'biodata',
        value: null,
        label: 'Biodata',
        type: 'textarea',
        placeholder: 'Your biodata...',
        required: false,
        readonly: false,
        disabled: false,
      },
    ]
  };

}

})();
