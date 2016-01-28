;(function() {

'use strict';

angular.module('App')
.service('Schema', Schema)
.factory('Collections', ['Schema', Collections])
.service('SchemaCollections', ['Collections', SchemaCollections]);

// configurable
function Collections(Schema) {
  return {
    employee: {
      schema: {
        'first_name': Schema.Text('first_name').required(true).create(),
        'middle_name': Schema.Text('middle_name').placeholder('Middle name (optional)').create(),
        'last_name': Schema.Text('last_name').required(true).create(),
        nik: Schema.Number('nik').required(true).placeholder('Nomor Induk Karyawan.create(), ex:0091234').create(),
        email: Schema.Email('email').required(true).placeholder('ex: bengbeng@think.web.id').create(),
        gender: Schema.Switch('gender').required(true).value([
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
        ]).create(),
        birthday: Schema.Birthday('birthday').required(true).create(),
        graduate: Schema.Dropdown('graduate').value([
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
        ]).create(),
        status: Schema.Radio('status').required(true).value([
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
        ]).create(),
        hobby: Schema.Checkbox('hobby').value([
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
        ]).create(),
        biodata: Schema.Textarea('biodata').placeholder('What\'s up..').create()
      },
      observers: [] // optional
    }
  };
}

// Start of Schema Class
function Schema() {
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
    filter: null // required|string|...
  },
  option = {};

  this.create = function () {
    var result = option;
    option = {};
    return result;
  };

  this.creator = function (id, option) {
    var
    opt = angular.extend({id: id, name: id, label: id.replace('_', ' ')},  option);
    this.set(opt);
    return this;
  };

  this.set = function () {
    if(arguments.length === 1) {
      option = angular.extend(defaults, option, arguments[0]);
    } else {
      option[arguments[0]] = arguments[1];
    }
    return this;
  };

  this.filter = function (filter) {
    this.set['filter'] = filter || null;
    return this;
  };

  this.required = function (required) {
    this.set['required'] = required || false;
    return this;
  };

  this.label = function (label) {
    this.set['label'] = label || false;
    return this;
  };

  this.placeholder = function (placeholder) {
    this.set['placeholder'] = placeholder || null;
    return this;
  };

  this.value = function (value) {
    this.set['value'] = value || null;
    return this;
  };

  this.readonly = function (readonly) {
    this.set['readonly'] = readonly || false;
    return this;
  };

  this.disabled = function (disabled) {
    this.set['disabled'] = disabled || false;
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
    return this.creator(id, {type: 'password', placeholder: 'Create a password'});
  };

  this.Birthday = function (id) { // return value Y-m-d H:i:s
    return this.creator(id, {type: 'birthday'});
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

function SchemaCollections(collections) {
  var
  fields = [];
  this.collections = function getCollections(collectionsName) {
    fields = collections[collectionsName];
    if (!fields) {
      return false;
    }
    return this;
  };

  this.fetch = function fetch() {
    var
    _fields = [],
    schema = fields.schema;
    for (var i in schema) {
      _fields.push(schema[i]);
    }
    return {
      id: 'collectionsName',
      name: 'collectionsName',
      fields: _fields
    };
  };

}

SchemaCollections.prototype.methodName = function (name) {
  console.log(name);
};

function Form() {

}

})();
