;(function() {
'use strict';

var MOD = 'Form'; // change module name as you need

angular.module(MOD, ['ngRoute'])

.constant('const.'+MOD+'.config', {
  name: MOD + " Directive"
})

.filter('isRequired', function () {
  return function (input) {
    if(input) return 'required';
    else return false;
  };
})

.directive('formGenerator', function() {
  return {
    restrict: 'EA',
    transclude: true,
    replace: true,
    templateUrl: 'app/modules/'+MOD.toLocaleLowerCase()+'/template/form-generator.html'
  };
})
.directive('fieldGenerator', function($compile, $http, $q) {

  var
  getTemplate = function(contentType){
    var
    templateUrl = 'app/modules/'+MOD.toLocaleLowerCase()+'/template/';
    switch(contentType) {
      case 'textarea':
        templateUrl += 'field-textarea.html';
      break;
      case 'checkbox':
        templateUrl += 'field-checkbox.html';
      break;
      case 'select':
        templateUrl += 'field-select.html';
      break;
      case 'datetime':
        templateUrl += 'field-datetime.html';
      break;
      case 'date':
        templateUrl += 'field-date.html';
      break;
      case 'time':
        templateUrl += 'field-time.html';
      break;
      case 'email':
        templateUrl += 'field-email.html';
      break;
      case 'password':
        templateUrl += 'field-password.html';
      break;
      case 'number':
        templateUrl += 'field-number.html';
      break;
      case 'radio':
        templateUrl += 'field-radio.html';
      break;
      case 'url':
        templateUrl += 'field-url.html';
      break;
      case 'birthdate':
        templateUrl += 'field-birthdate.html';
      break;
      case 'switch':
        templateUrl += 'field-switch.html';
      break;
      // case 'file':
      //   templateUrl += '*.html';
      // break;
      // case 'image':
      //   templateUrl += '*.html';
      // break;
      // case 'video':
      //   templateUrl += '*.html';
      // break;
      // case 'sound':
      //   templateUrl += '*.html';
      // break;
      default:
        templateUrl += 'field-text.html';
      break;
    }

    return $q(function(resolve, reject) {
      $http({
        method: 'GET',
        url: templateUrl
      }).then(function successCallback(response) {
        resolve(response.data);
      }, function errorCallback(response) {
        reject(response);
      });
    });
  },
  linker = function(scope, elem, attr){
    getTemplate(scope.data.type || 'text').then(function(template) {
      elem.html(template).show();
      var
      elInput = elem[0].getElementsByTagName('input')[0];
      if(scope.data.required) elInput.setAttribute('required', 'required');
      $compile(elem.contents())(scope);
    });
  };

  return {
    restrict: 'E',
    replace: true,
    templateUrl: function(elem, attr) {
      return 'app/modules/'+MOD.toLocaleLowerCase()+'/template/field-wrap.html';
    },
    link: linker
  };
})

// .RUN
// initial your module dependencies
.run(function() {
  console.log('Form module runnning...');
  // Do something right here, initial module open
});

})();
