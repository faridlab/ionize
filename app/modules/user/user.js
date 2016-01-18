;(function() {
'use strict';

var MOD = 'User'; // change module name as you need

angular.module(MOD, ['ngRoute'])

// .CONSTANT
.constant('const.'+MOD+'.route', [
{
  url: '/user/register',
  option: {
    templateUrl: 'app/modules/'+MOD.toLocaleLowerCase()+'/template/register.html',
    controller: MOD+'.register',
    controllerAs: MOD.toLocaleLowerCase()
  }
},
{
  url: '/user/login',
  option: {
    templateUrl: 'app/modules/'+MOD.toLocaleLowerCase()+'/template/login.html',
    controller: MOD+'.login',
    controllerAs: MOD.toLocaleLowerCase()
  }
}
])
.constant('const.'+MOD+'.config', {
  name: MOD
})


// .CONTROLLERS
.controller(MOD+'.login', [
  '$scope', '$log', '$q', '$http', '$routeParams', '$window', '$location', '$timeout',
  UserLogin
])

.controller(MOD+'.register', [
  '$scope', '$log', '$q', '$http', '$routeParams', '$window', '$location', '$timeout',
  UserRegister
])


// .RUN
// initial your module dependencies
.run(function() {
  console.log('User module runnning...');
  // Do something right here, initial application open

});


function UserLogin($scope, $log, $q, $http, $routeParams, $window, $location,$timeout) {

  var
  self = this;
  self.username = '';
  self.password = '';
  self.errorMessage = '';

  self.loading = false;
  self.error = false;

  self.onSubmit =  function() {

    var
    param = {};
    param.username = self.username;
    param.password = self.password;

    console.log(param);

    // Parse.User.logIn(param.username, param.password, {
    //   success: function(user) {
    //     $timeout(function(){
    //       $location.path('/');
    //     });
    //   },
    //   error: function(user, error) {
    //     self.loading = false;
    //     self.error = true;
    //     self.errorMessage = error.message;
    //   }
    // });
    // self.loading = true;

  };
}


function UserRegister($scope, $log, $q, $http, $routeParams, $window, $location, $timeout) {

  var
  self = this;
  self.username = '';
  self.password = '';
  self.email = '';
  self.first_name = '';
  self.last_name = '';

  self.errorMessage = '';
  self.loading = false;
  self.error = false;

  self.onSubmit = function() {

    if(self.password.trim() !== self.password2.trim()) {
      self.error = true;
      self.errorMessage = 'Password not matched';
    } else {

      self.loading = true;

      // var
      // user = new Parse.User();
      // user.set("username", self.username);
      // user.set("password", self.password);
      // user.set("email", self.email);
      // user.set("first_name", self.first_name);
      // user.set("last_name", self.last_name);
      // user.signUp(null, {
      //   success: function(user) {
      //     $timeout(function(){
      //       $location.path('/');
      //     });
      //     // TODO: give toast to inform user that s/he success to register
      //   },
      //   error: function(user, error) {
      //     console.log(123456789);
      //     self.loading = false;
      //     self.error = true;
      //     self.errorMessage = error.message;
      //   }
      // });
    }
  };
}


})();