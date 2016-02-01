;(function() {

'use strict';

angular.module('App')
.service('timestamp', Timestamp);

function Timestamp(data) {
  var date = new Date();
  return data;
}


})();
