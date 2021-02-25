import wxF from '@/utils/wx';
import Taro from '@tarojs/taro';

function random(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}
function getParams(str: string, symbol = '&') {
  const reg = new RegExp(`([^${symbol}=?]+)=([^${symbol}]+)`, 'g');
  const result: {
    [key: string]: any;
  } = {};
  str.replace(reg, (_, k, v) => {
    result[k] = v;
    return _;
  });
  return result;
}
function getCookie() {
  return getParams(document.cookie, ';');
}
function getWxThumbUrl(url: string) {
  const result = getParams(url);
  const { encfilekey } = result
  return `https://findermp.video.qq.com/251/20350/stodownload?encfilekey=${encfilekey}&token=x5Y29zUxcibDHxWfF8R3ao2Sic47V6Grqichtx9pibvXV2GqKYibO6AjjULcPGQt06jNR`;
}
function toChineseNum(number: string | number) {
  const chineseNum = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const unit = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万']
  const zero = '零'
  let numberStr = typeof number === 'string' ? number : number + '';
  const reverseArr = numberStr.split('').reverse();
  let result = ''
  for (let i = 0; i < reverseArr.length; i++) {
    const num = Number(reverseArr[i])
    if (num) {
      result = unit[i] + result;
    }
    result = chineseNum[num] + result;
    if (!result.startsWith(zero) && !num && i) {
      result = zero + result;
    }
  }
  return result;
}
function formatLike(number: string | number) {
  let numberStr = typeof number === 'string' ? number : number + '';
  if (numberStr.length >= 9) {
    return numberStr.slice(0, -8) + '亿'
  }
  /* if (numberStr.length >= 8) {
    return numberStr.slice(0, -7) + '千万'
  }
  if (numberStr.length >= 7) {
    return numberStr.slice(0, -6) + '百万'
  }
  if (numberStr.length >= 6) {
    return numberStr.slice(0, -5) + '十万'
  } */
  if (numberStr.length >= 5) {
    return numberStr.slice(0, -4) + '万'
  }
  /* if (numberStr.length >= 4) {
    return numberStr.slice(0, -3) + '千'
  } */
}
function getYesterday(offset: number = 1) {
  return (new Date(Date.now() - (86400000 * offset))).toISOString().substr(0, 10);
}
function wxMd5(buffer: ArrayBuffer) {
  const ab = new wxF.ArrayBuffer();
  const abs = ab.append(buffer);
  const md5 = abs.end();
  return md5;
}
function mockFormData(obj = {}) {
  let result = ''
  for (let name of Object.keys(obj)) {
    let value = obj[name];
    if (name === 'filedata') {
      result +=
        '\r\n--WebKitXXX' +
        '\r\nContent-Disposition: form-data; name=\"' + name + '\"' + '; filename=\"blob\"' +
        '\r\nContent-Type: application/octet-stream' +
        '\r\n' +
        '\r\n' + value
    } else {
      result +=
        '\r\n--WebKitXXX' +
        '\r\nContent-Disposition: form-data; name=\"' + name + '\"' +
        '\r\n' +
        '\r\n' + value
    }
  }
  return result + '\r\n--WebKitXXX--'
}
function shuffle(arr: any[]) {
  const copyArr = [...arr];
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = random(i, arr.length - 1);
    [copyArr[i], copyArr[randomIndex]] = [copyArr[randomIndex], copyArr[i]];
  }
  return copyArr;
}
function randomStr(length: number, isUpper: boolean = false) {
  const upperCode = [65, 90];
  const lowerCode = [97, 122];
  const numberCode = [48, 57];
  return Array.from({ length }).reduce((acc) => {
    const randomCode = shuffle([isUpper ? upperCode : lowerCode, numberCode]);
    const charCode = String.fromCharCode(random.apply(null, randomCode[0]));
    acc += charCode;
    return acc;
  }, '');
}
function getCurrMaxDay() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = new Date(year, month, 0);
  return day.getDate();
}
function getFutureDates() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const maxDay = getCurrMaxDay();
  let enough = 1;
  if (getFutureHours().length < 5) {
    enough = 0
  }
  const relativeDate = ['今天', '明天', '后天'];
  const weekDate = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return Array.from({ length: maxDay }, (_, index) => {
    const value = `${month}/${index + 1}`;
    const chineseDay = weekDate[(new Date(`${year}/${value}`)).getDay()];
    return ({
      label: `${doubleTime(month)}月${doubleTime(index + 1)}日 ${chineseDay}`,
      value
    })
  }).slice(day - enough).map((item, index) => {
    return ({
      label: `${item.label}${relativeDate[index] ? ` (${relativeDate[index]}) ` : ''}`,
      value: `${item.value}`
    });
  })
}
function getFutureHours(force?: boolean) {
  const date = new Date();
  const minute = date.getMinutes();
  let hour = force ? 0 : date.getHours();
  if (minute >= 55) {
    hour++;
  }
  return Array.from({ length: 24 }, (_, index) => (
    `${doubleTime(index)}`
  )).slice(hour).map(item => ({
    label: item,
    value: parseInt(item, 10)
  }));
}

function doubleTime(i) {
  return `${(i.toString()).length > 1 ? i : `0${i}`}`
}
function getFutureMinutes(force?: boolean) {
  const date = new Date();
  const minute = date.getMinutes();
  const result: string[] = [];
  for (let i = 0; i < 60; i++) {
    if (i >= minute + 5 || minute >= 55 || force) {
      i % 5 === 0 && result.push(doubleTime(i))
    }
  }
  return result.map(item => ({
    label: item,
    value: parseInt(item, 10)
  }))
}
function navigateTo(url: string) {
  Taro.showLoading({
    title: '加载中',
    mask: true
  });
  Taro.navigateTo({
    url,
    success() {
      Taro.hideLoading();
    }
  });
}

function delay(time: number = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

/**
 * 
 * @param scope 需要获取权限的 scope，详见 scope 列表
 * https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html#scope-%E5%88%97%E8%A1%A8
 */
async function getUserAuth(scope: string) {
  const res = await Taro.getSetting();
  if (!res.authSetting[scope]) {
    return Taro.authorize({
      scope,
    });
  }
}

function getFutureRange() {
  const labels = [getFutureDates().map(item => item.label), getFutureHours().map(item => item.label), getFutureMinutes().map(item => item.label)];
  const values = [getFutureDates().map(item => item.value), getFutureHours().map(item => item.value), getFutureMinutes().map(item => item.value)];
  return {
    labels,
    values
  }
}

export {
  delay,
  random,
  getParams,
  getCookie,
  toChineseNum,
  getWxThumbUrl,
  formatLike,
  getYesterday,
  wxMd5,
  mockFormData,
  randomStr,
  getFutureDates,
  getFutureHours,
  getCurrMaxDay,
  getFutureMinutes,
  getFutureRange,
  getUserAuth,
  navigateTo,
}