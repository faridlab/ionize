import {config} from './config';

let _path: any = {
  production:   'http://production.endpoint.com',
  staging:      'http://staging.endpoint.com',
  development:  'http://development.endpoint.com',
};

let _uri: any = {
  user: {
    login:      '/user/login',
    update:     '/user',
    register:   '/user/register',
    forgot:     '/password/email/merchant'
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
