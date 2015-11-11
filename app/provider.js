;(function() {

'use strict';

angular.module('AppSeed')
.provider('appProvider', function(appConfig) {
  this.foo = null;
  this.$get = function() {
    return this;
  };
});

})();