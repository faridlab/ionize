export const APPNAME = 'Application Name';
export const DESC = 'Application description';
export const VERSION = 'v0.0.1';
export const VERSIONCODE = 1;
export const ORGANIZATION = 'Organization name';
export const ORGURL = 'http://yourdomain.com';
export const PACKAGE = 'com.yourdomain';
export const ENV = 'development'; // production, staging, testing, development
export const DBNAME = 'app.db';
export const TAG = `::${APPNAME}:: >> `;
export const TOKEN = null;

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
  token: TOKEN
};

 // Appllication default configuration, arabic text, language, etc
export let appConfigDefault: any = {
  intro: false,
  user: null,
  lang: 'en',
};

export function getToken() {
  return config.token;
}

export function getAppConfigDefault() {
  return appConfigDefault;
}
