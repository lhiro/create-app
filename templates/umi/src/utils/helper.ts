// import { isBrowser } from 'umi';

export function getCsrfToken() {
  // if (!isBrowser()) return;
  const cookieParams = getParams(document.cookie, ';');
  return cookieParams['csrfToken'];
}

export function getParams(str: string, symbol = '&') {
  const reg = new RegExp(`([^${symbol}=?]+)=([^${symbol}]+)`, 'g');
  const result: {
    [key: string]: any;
  } = {};
  str.replace(reg, (_, k, v) => {
    result[k.trim()] = v;
    return _;
  });
  return result;
}

export function checkAccess() {
  const auth = localStorage.getItem('auth');
  if (auth) {
    return JSON.parse(auth);
  }
  return false;
}