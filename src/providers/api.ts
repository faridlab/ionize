import {config} from './config';

let _path: any = {
  production: 'http://api.eatenary.com/public/api/v1',
  staging: 'http://staging.eatenary.com/api/public/api/v1',
  development: 'http://dev.eatenary.com/api/public/api/v1',
  local: 'http://localhost/eatenary/API/public/api/v1',
  ip: 'http://192.168.55.106/eatenary/API/public/api/v1',
  // public: 'http://192.168.55.106/eatenary/merchant/public' // IP
  public: 'http://localhost/eatenary/merchant/public' // local
  // public: 'http://dev.eatenary.com/merchant/public' // development
};

let _uri: any = {
  getBranches:  '/getBranches',
  purpose:      '/purpose',
  type:         '/type',
  feedback: {
    search:     '/feedback',
    add:        '/feedback'
  },
  menu: {
    search:     '/menu',
    getMenusByBranchId: '/menu/getMenusByBranchId'
  },
  service:      '/service',
  openhour:     '/openhour',
  merchantPhoto: '/merchant_photo',
  seat: {
    search:     '/seat',
    availability:     '/seat/availability'
  },
  notification: {
    search:     '/notification',
    update:     '/notification'
  },
  user: {
    login:      '/user/login',
    update:     '/user',
    register:   '/user/register',
    forgot:     '/password/email/merchant'
  },
  location: {
    country:      '/country',
    province:     '/province',
    city:         '/city'
  },
  reservation: {
    search:       '/reservation',
    confirm:      '/reservation/confirm'
  },
  transaction: {
    search:       '/transaction',
    charge:       '/transaction/charge',
    finish:       '/transaction/finish',
    unfinish:     '/transaction/unfinish',
    error:        '/transaction/error'
  },
  charge: {
    search:       '/charge'
  },
  device: {
    search:       '/device',
    add:          '/device'
  },
  storage: {
    branch: '/storage/branch',
    menu: '/storage/menu'
  }
};

// EXPORT api function
export function api (path, param = null, env = null): string {
  try {
    var
    split = path.split('.'),
    res = _uri;
    for (var i = 0; i < split.length; i++) {
      res = res[split[i]];
    }

    var
    uri = _path[env || config.environment] + res;
    if (param) {
      if (param instanceof Array) {
        return uri.concat('/', param.join('/'));
      }
      return uri.concat('/', param);
    }
  } catch (err) {
    console.error(err);
  }
  return uri;
}
