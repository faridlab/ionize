import {config} from './config';

let _path: any = {
  production: 'http://api.example.com',
  staging: null,
  testing: 'http://api.example.com',
  development: 'http://api.example.com',
};

let _uri: any = {
    user: {
      login:    '/user/login',
      register: '/user/register',
      logout:   '/user/logout',
      forgot:   '/user/forgot',
      profile:  '/user/profile'
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
