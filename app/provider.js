;(function() {

'use strict';

angular.module('App')
.provider('appProvider', function(config) {
  this.foo = null;
  this.$get = function() {
    return this;
  };
});

})();
