export const APPNAME = 'Awesome Mobile App';
export const DESC = 'The amazing mobile application ever!.';
export const VERSION = 'v0.0.1';
export const VERSIONCODE = 1;
export const ORGANIZATION = 'The Amazing Organization';
export const ORGURL = 'http://example.com';
export const PACKAGE = 'com.example';
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
