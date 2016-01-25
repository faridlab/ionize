;(function() {

'use strict';

angular.module('App')
.constant('config.db',
  {
    name:     'app.db',
    version:  1,
    scheme:   '0.0.1',
    logs:    [{1: '0.0.1'}],
    schemes: {
      '0.0.1': [
        'CREATE TABLE IF NOT EXISTS table_name       (id INTEGER PRIMARY KEY, column_name TEXT, column_name INTEGER)'
      ]
    },
    collections: {}
  });

})();
