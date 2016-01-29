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
        'first_name': Schema.Text('first_name').required(true),
        'middle_name': Schema.Text('middle_name').placeholder('Middle name (optional)'),
        'last_name': Schema.Text('last_name').required(true),
        nik: Schema.Number('nik').required(true).placeholder('Nomor Induk Karyawan, ex:0091234'),
        email: Schema.Email('email').required(true).placeholder('ex: bengbeng@think.web.id'),
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
        ]),
        birthday: Schema.Birthday('birthday').required(true),
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
        ]),
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
        ]),
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
        ]),
        biodata: Schema.Textarea('biodata').placeholder('What\'s up..')
      },
      observers: [] // optional
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
    schemas = fields.schema;
    for (var i in schemas) {
      _fields.push(schemas[i].generate());
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
