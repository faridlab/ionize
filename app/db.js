;(function() {

'use strict';

angular.module('App')
.constant('configDb',
{
  name:     'app.db',
  version:  1,
  scheme:   '0.0.1',
  logs:    [{1: '0.0.1'}],
  schemes: {
    '0.0.1': [
      'CREATE TABLE IF NOT EXISTS locations       (id INTEGER PRIMARY KEY, column_name TEXT, column_name INTEGER)'
    ]
  },
  collections: {}
})

.provider('appDb', function(configDb){

  this.db = null;
  this.openDb = function() {
    this.db = window.sqlitePlugin.openDatabase({name: configDb.name, location: 1});
  };

  this.init = function(callback) {

    if(localStorage.getItem('db.built')) {
      if(callback) callback(null, {message: 'The database is built.', status: 0});
      return;
    }

    var
    that = this,
    db = configDb,
    scheme = db.scheme,
    schemes = db.schemes[scheme];
    that.db.transaction(function(tx) {
      // execute db from user configuration
      for (var j = 0; j < schemes.length; j++) {
        tx.executeSql(schemes[j]);
      }
      if(callback) callback({message: 'Initialization database successful', status: 1});
      localStorage.setItem('db.built', true);
    });
  };

  this.query = function(sql, param, cb) {
    this.db.transaction(function(tx) {
      tx.executeSql(sql, param, function(tx, res) {
        if(cb) cb(res);
      }, function(e) {
        if(cb) cb(null, e);
      });
    });
  };

  this.batch = function(sql, params, cb) {
    var
    batch = [];
    for (var i in params) {
      batch.push([sql, params[i]]);
    }
    this.db.sqlBatch(batch, function() {
      if(cb) cb();
    }, function(error) {
      console.log('Populate table error: ' + error.message);
    });
  };

  this.$get = function() {
    return this;
  };

});

})();
