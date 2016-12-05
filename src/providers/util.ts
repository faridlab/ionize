import { Network } from 'ionic-native';

export function uniqid(pr = '', en = false) {
  let result: any;
  let seed = function (s, w) {
    s = parseInt(s, 10).toString(16);
    return w < s.length ? s.slice(s.length - w) : (w > s.length) ? new Array(1 + (w - s.length)).join('0') + s : s;
  };
  result = pr + seed(parseInt((new Date().getTime() / 1000).toString(), 10), 8) + seed(Math.floor(Math.random() * 0x75bcd15) + 1, 5);

  if (en) result += (Math.random() * 10).toFixed(8).toString();
  return result;

};

export function convertoCurrency(val) {
  let num = parseInt(val || 0, 0);
  return num.toLocaleString();
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

let states = {
  unknown: 'Unknown connection',
  ethernet: 'Ethernet connection',
  wifi: 'WiFi connection',
  '2g': 'Cell 2G connection',
  '3g': 'Cell 3G connection',
  '4g': 'Cell 4G connection',
  'cellular': 'Cell generic connection',
  none: 'No network connection'
};

export function checkConnection() {
  let networkState = Network.connection;
  return new Promise((resolve, reject) => {
    if(networkState === 'none') {
      reject(states[networkState]);
    } else {
      resolve(states[networkState]);
    }
  });
}
