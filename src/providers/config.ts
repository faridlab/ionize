export const APPNAME = 'Eatenary';
export const DESC = 'The other way to reserve your seat.';
export const VERSION = 'v0.0.1';
export const VERSIONCODE = 1;
export const ORGANIZATION = 'PT. Eatenary Indonesia';
export const ORGURL = 'http://eatenary.com';
export const PACKAGE = 'com.eatenary';
export const ENV = 'local'; // production, staging, testing, development
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
  prefix: 'ETNRY',
  token: null
};

// EXPORT appConfigDefault
export let appConfigDefault: any = {
  intro: false,
  setting: {
    lang: 'en',
  }
};


let paymentMethods: any = [
  {id: 'credit_card', method: 'Credit Card'},
  {id: 'bank_transfer', method: 'Bank Transfer'},
  {id: 'cimb_clicks', method: 'CIMB Clicks'},
  {id: 'mandiri_clickpay', method: 'Mandiri ClickPay'},
  {id: 'bri_epay', method: 'BRI ePay'},
  {id: 'telkomsel_cash', method: 'Telkomsel Cash'},
  {id: 'xl_tunai', method: 'XL Tunai'},
  {id: 'echannel', method: 'eChannel'}
];

let enabledPayments: any = ['credit_card', 'bank_transfer', 'cimb_clicks', 'mandiri_clickpay', 'bri_epay', 'telkomsel_cash', 'xl_tunai', 'echannel'];
let filterDefault: any = {
  rated: false,
  top10deals: false,
  nearBy: true, // as default value
  merchant: {
    type: [],
    purpose: [],
    service: []
  },
  sortBy: null,
  location: {
    country_id: null,
    province_id: null,
    city_id: null
  }
};

let userDefaultReserveSetting: any = {
  phone: null,
  letMerchantCall: false,
  purpose: [],
  payment: null
};


  export function getFilterDefault() {
    return filterDefault;
  }

  export function getUserDefaultReserveSetting() {
    return userDefaultReserveSetting;
  }

  export function getPaymentMethods() {
    return paymentMethods;
  }

  export function getPaymentMethodName(id: String = null) {
    if (!id) return null;
    let methods = paymentMethods;
    for (let i in methods) {
      if (methods[i]['id'] === id) return methods[i]['method'];
    }
    return null;
  }

  export function getEnabledPayments() {
    return enabledPayments;
  }

  export function getPrefix() {
    return config.prefix;
  }
