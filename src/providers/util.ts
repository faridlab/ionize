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
