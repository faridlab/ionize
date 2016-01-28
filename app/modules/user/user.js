;(function() {
'use strict';

var MOD = 'User'; // change module name as you need

angular.module(MOD, ['ngRoute'])

// .CONSTANT
.constant('const.'+MOD+'.route', [
{
  uri: '/user/profile',
  option: {
    templateUrl: 'app/modules/'+MOD.toLocaleLowerCase()+'/template/profile.html',
    controller: MOD+'.profile',
    controllerAs: MOD.toLocaleLowerCase()
  }
},
{
  uri: '/user/register',
  option: {
    templateUrl: 'app/modules/'+MOD.toLocaleLowerCase()+'/template/register.html',
    controller: MOD+'.register',
    controllerAs: MOD.toLocaleLowerCase()
  }
},
{
  uri: '/user/login',
  option: {
    templateUrl: 'app/modules/'+MOD.toLocaleLowerCase()+'/template/login.html',
    controller: MOD+'.login',
    controllerAs: MOD.toLocaleLowerCase()
  }
},
{
  uri: '/user/password',
  option: {
    templateUrl: 'app/modules/'+MOD.toLocaleLowerCase()+'/template/password.html',
    controller: MOD+'.password',
    controllerAs: MOD.toLocaleLowerCase()
  }
}
])
.constant('const.'+MOD+'.config', {
  name: MOD,
  isMocked: true, // change this config to get the real end point config
  salt: 'b3n6', // salting
})


// .FACTORY
.factory('userData', function() {
  return {
    data: null,
    set: function(keyVal, val) {
      if(arguments.length === 1) {
        this.data = keyVal;
      } else {
        this.data[keyVal] = val;
      }
    },
    get: function(key) {
      if(arguments.length === 0) {
        return this.data;
      } else {
        return this.data[key];
      }
    }
  };
})


// .CONTROLLERS
.controller(MOD+'.login', [
  '$scope', '$http', '$location', 'const.'+MOD+'.config', 'userData',
  UserLogin
])

.controller(MOD+'.register', [
  '$scope', '$http', '$location', 'const.'+MOD+'.config',
  UserRegister
])

.controller(MOD+'.profile', [
  '$scope', '$http', '$location', 'const.'+MOD+'.config', 'userData',
  UserProfile
])

.controller(MOD+'.password', [
  '$scope', '$http', '$location', 'const.'+MOD+'.config', 'userData',
  UserPassword
])


// .RUN
// initial your module dependencies
.run(['userData', '$location', function(userData, $location) {

  console.log('User module runnning...');
  // Do something right here, initial application open
}]);


function UserLogin($scope, $http, $location, config, userData) {

  console.log($scope);

  var
  self = this;
  self.username = '';
  self.password = '';
  self.errorMessage = '';

  self.loading = false;
  self.error = false;

  self.onSubmit =  function() {

    if(config.isMocked) {
      var
      user = localStorage.getItem(self.username+'.'+self.password.substr(-3)+'.'+config.salt);
      if(user) {

        localStorage.setItem('user', user);
        userData.set(JSON.parse(user));
        // $location.path('/');

      } else {
        self.loading = false;
        self.error = true;
        self.errorMessage = 'User is not exists.';
      }

    } else {
      self.loading = false;
      self.error = true;
      self.errorMessage = 'Please define the right end point.';
    }

  };
}


function UserRegister($scope, $http, $location, config) {

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
      if(config.isMocked) {
        var
        user = {
          username: self.username,
          password: self.password.substr(-3)+'.'+config.salt,
          email: self.email,
          first_name: self.first_name,
          last_name: self.last_name
        };

        localStorage.setItem(self.username+'.'+self.password.substr(-3)+'.'+config.salt, JSON.stringify(user));
        $location.path('/user/login');

      } else {
        self.loading = false;
        self.error = true;
        self.errorMessage = 'Please define the right end point.';
      }
    }
  };
}

function UserProfile($scope, $http, $location, config, userData) {

  var
  self = this;
  self.username = userData.get('username');
  self.password = userData.get('password');
  self.email = userData.get('email');
  self.first_name = userData.get('first_name');
  self.last_name = userData.get('last_name');

  self.errorMessage = '';
  self.loading = false;
  self.error = false;

  self.onSubmit = function() {
    self.loading = true;
    if(config.isMocked) {
      var
      user = {
        username: self.username,
        password: userData.get('password'),
        email: self.email,
        first_name: self.first_name,
        last_name: self.last_name
      };

      localStorage.setItem(self.username+'.'+userData.get('password'), JSON.stringify(user));
      localStorage.setItem('user', JSON.stringify(user));
      userData.set(user);

      self.loading = false;

    } else {
      self.loading = false;
      self.error = true;
      self.errorMessage = 'Please define the right end point.';
    }

  };
}

function UserPassword($scope, $http, $location, config, userData) {

  var
  self = this;
  self.username = userData.get('username');
  self.password = null;
  self.oldpassword = null;
  self.email = userData.get('email');
  self.first_name = userData.get('first_name');
  self.last_name = userData.get('last_name');

  self.errorMessage = '';
  self.loading = false;
  self.error = false;

  self.onSubmit = function() {
    self.loading = true;
    if(config.isMocked) {

      if(self.oldpassword.trim().substr(-3)+'.'+config.salt !== userData.get('password')) {
        self.error = true;
        self.errorMessage = 'Old Password incorrect!.';
      } else if(self.password.trim() !== self.password2.trim()) {
        self.error = true;
        self.errorMessage = 'New Password not matched';
      } else {

        var
        user = {
          username: self.username,
          password: self.password.substr(-3)+'.'+config.salt,
          email: self.email,
          first_name: self.first_name,
          last_name: self.last_name
        };

        localStorage.removeItem(self.username+'.'+userData.get('password'), JSON.stringify(user));
        localStorage.setItem(self.username+'.'+self.password.substr(-3)+'.'+config.salt, JSON.stringify(user));
        localStorage.setItem('user', JSON.stringify(user));
        userData.set(user);

        self.loading = false;
      }

    } else {
      self.loading = false;
      self.error = true;
      self.errorMessage = 'Please define the right end point.';
    }

  };
}


})();
