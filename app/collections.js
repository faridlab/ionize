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
    province: {
      schema: {
        name: Schema.Text('name').placeholder('Nama Provinsi').label('Nama Provinsi'),
      },
      observers: [] // optional
    },
    city: {
      schema: {
        province: Schema.Dropdown('province').required(true).label('Provinsi').placeholder('Provinsi'),
        name: Schema.Text('name').placeholder('Kabupaten/Kota').label('Kabupaten / Kota')
      },
      observers: [] // optional
    },
    location: {
      schema: {
        province: Schema.Text('province').required(true).label('Provinsi').placeholder('Provinsi'),
        city: Schema.Text('city').placeholder('Kabupaten/Kota').label('Kabupaten / Kota'),
        name: Schema.Text('name').placeholder('Nama Kawasan').label('Nama Kawasan'),
        law: Schema.Textarea('law').placeholder('Dasar Hukum').label('Dasar Hukum'),
        plan: Schema.Textarea('plan').placeholder('Rencana Pengelolaan').label('Rencana Pengelolaan'),
        type: Schema.Text('type').placeholder('Tipe Kawasan').label('Tipe Kawasan'),
        width: Schema.Number('width').placeholder('Luas Kawasan').label('Luas Kawasan'),
        iucn: Schema.Text('iucn').placeholder('Kategori IUCN').label('Kategori IUCN'),
        lintang: Schema.Text('lintang').placeholder('Garis Lintang').label('Garis Lintang'),
        bujur: Schema.Text('bujur').placeholder('Garis Bujur').label('Garis Bujur'),
        efektifitas: Schema.Textarea('efektifitas').placeholder('Efektifitas Pengelolaan').label('Efektifitas Pengelolaan'),
        informasi: Schema.Textarea('informasi').placeholder('Informasi Tambahan').label('Informasi Tambahan'),
        foto: Schema.File('foto').placeholder('Unggah berkas gambar...').label('Gambar'),
        kondisi: Schema.Textarea('kondisi').placeholder('Kondisi Umum').label('Kondisi Umum'),
        geografis: Schema.Text('geografis').placeholder('Letak Geografis').label('Letak Geografis'),
        aksesibilitas: Schema.Text('aksesibilitas'),
        iklim: Schema.Text('iklim'),
        kondisiperairan: Schema.Text('kondisiperairan').placeholder('Kondisi Perairan').label('Kondisi Perairan'),
        ekosistemair: Schema.Text('ekosistemair').placeholder('Kondisi Ekosistem Air').label('Kondisi Ekosistem Air'),
        sosekobud: Schema.Textarea('sosekobud').placeholder('Kondisi Sosial Ekonomi Budaya').label('Kondisi Sosial Ekonomi Budaya'),
        pencaharian: Schema.Text('pencaharian').placeholder('Mata Pencarian').label('Mata Pencarian'),
        potensiperikanan: Schema.Text('potensiperikanan').placeholder('Potensi Perikanan').label('Potensi Perikanan'),
        pendekatankonservasi: Schema.Text('pendekatankonservasi').placeholder('Pendekatan Konservasi').label('Pendekatan Konservasi'),
        pariwisata: Schema.Text('pariwisata'),
        longitude: Schema.Text('longitude'),
        latitude: Schema.Text('latitude')
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
    return this.creator(id, {type: 'select', placeholder: '--- Select ---'});
  };

  this.Radio = function (id) {
    return this.creator(id, {type: 'radio', other: false});
  };

  this.Checkbox = function (id) {
    return this.creator(id, {type: 'checkbox'});
  };

  this.Textarea = function (id) {
    return this.creator(id, {type: 'textarea'});
  };

  this.File = function (id) {
    return this.creator(id, {type: 'file'});
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

  this.getField = function getField(name){
    return fields.schema[name];
  }

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

          case 'radio':
            collections[fields[i].id] = that.radio(fields[i]);
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

SchemaCollections.prototype.radio = function (data) {
  if(data.other && data.value === 'form-other') {
    return data.othervalue || null;
  }
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
