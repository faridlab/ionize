;(function() {

'use strict';

angular.module('App')
.service('Schema', Schema)
.factory('Collections', ['Schema', Collections])
.factory('DataFactory', DataFactory)
.service('SchemaCollections', ['Collections', '$q', SchemaCollections]);

// configurable
function Collections(Schema) {
  return {
    employee: {
      schema: {
        first_name: Schema.Text('first_name').required(true),
        middle_name: Schema.Text('middle_name').placeholder('Middle name (optional)'),
        last_name: Schema.Text('last_name').required(true),
        nik: Schema.Number('nik').required(true).placeholder('Nomor Induk Karyawan, ex:0091234'),
        email: Schema.Email('email').required(true).placeholder('ex: bengbeng@think.web.id'),
        gender: Schema.Switch('gender').options([
          // left value as default value
          {
            label: "Male",
            value: 1
          },
          // Right value as default value
          {
            label: "Female",
            value: 0
          }
        ]),
        birthday: Schema.Birthday('birthday').required(true),
        graduate: Schema.Dropdown('graduate').options([
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
        ]),
        status: Schema.Radio('status').required(true).options([
          {
            label: "Single",
            value: 1
          },
          {
            label: "Married",
            value: 2
          },
          {
            label: "Jomblo",
            value: 3
          }
        ]),
        hobby: Schema.Checkbox('hobby').options([
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
        ]),
        biodata: Schema.Textarea('biodata').placeholder('What\'s up..')
      },
      observers: [] // optional
    }
  };
}

function DataFactory() {
  return {
    data: {},
    add: function(collection, data) {
      if(!this.data[collection]) this.data[collection] = [];
      this.data[collection].push(data);
      return true;
    },
    delete: function(collection, data) {
      this.data[collection].splice(data, 1);
      return true;
    },
    get: function(collection, index) {
      if(arguments.length === 1){
        return this.data[collection];
      } else {
        return this.data[collection][index];
      }
    },
    set: function(collection, index, data) {
      this.data[collection][index] = data;
      return true;
    }
  };
}


// Start of Schema Class
function Schema() {

  this.creator = function (id, option) {
    var
    defaults = {
      id: null,
      name: null,
      value: null,
      label: null,
      type: null,
      placeholder: null,
      required: false,
      readonly: false,
      disabled: false,
      options: [],
      filter: null // required|string|...
    },
    opt = angular.extend(defaults, {id: id, name: id, label: id.replace('_', ' ')},  option);
    return new SchemaGenerator(opt);
  };

  function SchemaGenerator (option) {
    this.option = {};
    this.set(option);
  }

  SchemaGenerator.prototype.generate = function () {
    return this.option;
  };

  SchemaGenerator.prototype.set = function () {
    if(arguments.length === 1) {
      this.option = angular.extend(this.option, arguments[0]);
    } else {
      this.option[arguments[0]] = arguments[1];
    }
    return this;
  };

  SchemaGenerator.prototype.filter = function (filter) {
    this.set('filter', filter || null);
    return this;
  };

  SchemaGenerator.prototype.required = function (required) {
    this.set('required', required || false);
    return this;
  };

  SchemaGenerator.prototype.label = function (label) {
    this.set('label', label || null);
    return this;
  };

  SchemaGenerator.prototype.placeholder = function (placeholder) {
    this.set('placeholder', placeholder || null);
    return this;
  };

  SchemaGenerator.prototype.value = function (value) {
    this.set('value', value || null);
    return this;
  };

  SchemaGenerator.prototype.readonly = function (readonly) {
    this.set('readonly', readonly || false);
    return this;
  };

  SchemaGenerator.prototype.disabled = function (disabled) {
    this.set('disabled', disabled || false);
    return this;
  };

  SchemaGenerator.prototype.options = function (options) {
    this.set('options', options || []);
    return this;
  };

  // Form Creator
  this.Text = function (id) {
    return this.creator(id, {type: 'text'});
  };

  this.Email = function (id) {
    return this.creator(id, {type: 'email', placeholder: 'ex: einstein@mail.com'});
  };

  this.Password = function (id) {
    return this.creator(id, {type: 'password', placeholder: 'Create a password', confirm: null});
  };

  this.Birthday = function (id) { // return value Y-m-d H:i:s
    return this.creator(id, {type: 'birthday', year: null, month: null, day: null});
  };

  this.Switch = function (id) {
    return this.creator(id, {type: 'switch'});
  };

  this.Number = function (id) {
    return this.creator(id, {type: 'number'});
  };

  this.Dropdown = function (id) {
    return this.creator(id, {type: 'select'});
  };

  this.Radio = function (id) {
    return this.creator(id, {type: 'radio'});
  };

  this.Checkbox = function (id) {
    return this.creator(id, {type: 'checkbox'});
  };

  this.Textarea = function (id) {
    return this.creator(id, {type: 'textarea'});
  };
}
// End of Schema Class


function SchemaCollections(collections, $q) {

  this.$q = $q;

  var
  fields = [];

  this.collectionsName = null;

  this.collections = function getCollections(collectionsName) {
    fields = collections[collectionsName];
    this.collectionsName = collectionsName;
    if (!fields) {
      return false;
    }
    return this;
  };

  this.generate = function generate() {
    var
    _fields = [],
    schemas = fields.schema;
    for (var i in schemas) {
      _fields.push(schemas[i].generate());
    }
    return {
      id: this.collectionsName,
      name: this.collectionsName,
      fields: _fields
    };
  };

}


SchemaCollections.prototype.fetch = function (fields) {
  var
  that = this,
  collections = {};

  return that.$q(function(resolve, reject) {
    try {
      for (var i in fields) {
        switch (fields[i].type) {
          case 'password':
            collections[fields[i].id] = that.password(fields[i]);
          break;

          case 'switch':
            collections[fields[i].id] = that.switch(fields[i]);
          break;

          case 'birthday':
            collections[fields[i].id] = that.birthday(fields[i]);
          break;

          case 'checkbox':
            collections[fields[i].id] = that.checkbox(fields[i]);
          break;

          default: // 'text', 'email', 'number', 'textarea'
            collections[fields[i].id] = that.text(fields[i]);
          break;
        }
      }
      resolve(collections);
    } catch (e) {
      reject(e);
    }
  });
};

SchemaCollections.prototype.text = function (data) {
  return data.value || null;
};

SchemaCollections.prototype.password = function (data) {
  if(data.value !== data.confirm) {
    throw new Error("Sorry, password no match!.");
  }
  return data.value;
};

SchemaCollections.prototype.switch = function (data) {
  if(data.value === null) {
    data.value = data.options[0].value;
  }
  return data.value;
};

SchemaCollections.prototype.birthday = function (data) {
  return data.year+'-'+data.month+'-'+data.day;
};

SchemaCollections.prototype.checkbox = function (data) {
  var
  options = [];
  for (var i in data.options) {
    if (data.options[i].checked !== undefined) {
      options.push(data.options[i].checked);
    }
  }
  return options;
};

})();
