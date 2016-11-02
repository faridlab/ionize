export const APPNAME = '';
export const DESC = '';
export const VERSION = 'v0.0.1';
export const VERSIONCODE = 1;
export const ORGANIZATION = '';
export const ORGURL = 'http://faridlab.com';
export const PACKAGE = 'com.faridlab';
export const ENV = 'development'; // production, staging, testing, development
export const DBNAME = 'app.db';
export const TAG = ':: TAG >> ';

// EXPORT config
export let config: any = {
  name:     APPNAME,
  desc:     DESC,
  version:  VERSION,
  versionCode: VERSIONCODE,
  organization: ORGANIZATION,
  url: ORGURL,
  package:  PACKAGE,
  environment: ENV,
  token: null
};

// EXPORT appConfigDefault
export let appConfigDefault: any = {
  intro: false,
  setting: {
    lang: 'en',
  }
};
