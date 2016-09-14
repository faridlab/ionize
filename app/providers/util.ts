import {config} from './config';

// EXPORT api function
export function api (path, param = null, env = null): string {
  try {
    var
    split = path.split('.'),
    res = config.uri;
    for (var i = 0; i < split.length; i++) {
      res = res[split[i]];
    }

    var
    uri = config.path[env || config.environment] + res;
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
