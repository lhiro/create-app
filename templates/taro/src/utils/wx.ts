var e = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

function f() {
  this.reset()
}
function n(t, e) {
  var n = t[0]
    , i = t[1]
    , r = t[2]
    , a = t[3];
  n += (i & r | ~i & a) + e[0] - 680876936 | 0,
    n = (n << 7 | n >>> 25) + i | 0,
    a += (n & i | ~n & r) + e[1] - 389564586 | 0,
    a = (a << 12 | a >>> 20) + n | 0,
    r += (a & n | ~a & i) + e[2] + 606105819 | 0,
    r = (r << 17 | r >>> 15) + a | 0,
    i += (r & a | ~r & n) + e[3] - 1044525330 | 0,
    i = (i << 22 | i >>> 10) + r | 0,
    n += (i & r | ~i & a) + e[4] - 176418897 | 0,
    n = (n << 7 | n >>> 25) + i | 0,
    a += (n & i | ~n & r) + e[5] + 1200080426 | 0,
    a = (a << 12 | a >>> 20) + n | 0,
    r += (a & n | ~a & i) + e[6] - 1473231341 | 0,
    r = (r << 17 | r >>> 15) + a | 0,
    i += (r & a | ~r & n) + e[7] - 45705983 | 0,
    i = (i << 22 | i >>> 10) + r | 0,
    n += (i & r | ~i & a) + e[8] + 1770035416 | 0,
    n = (n << 7 | n >>> 25) + i | 0,
    a += (n & i | ~n & r) + e[9] - 1958414417 | 0,
    a = (a << 12 | a >>> 20) + n | 0,
    r += (a & n | ~a & i) + e[10] - 42063 | 0,
    r = (r << 17 | r >>> 15) + a | 0,
    i += (r & a | ~r & n) + e[11] - 1990404162 | 0,
    i = (i << 22 | i >>> 10) + r | 0,
    n += (i & r | ~i & a) + e[12] + 1804603682 | 0,
    n = (n << 7 | n >>> 25) + i | 0,
    a += (n & i | ~n & r) + e[13] - 40341101 | 0,
    a = (a << 12 | a >>> 20) + n | 0,
    r += (a & n | ~a & i) + e[14] - 1502002290 | 0,
    r = (r << 17 | r >>> 15) + a | 0,
    i += (r & a | ~r & n) + e[15] + 1236535329 | 0,
    i = (i << 22 | i >>> 10) + r | 0,
    n += (i & a | r & ~a) + e[1] - 165796510 | 0,
    n = (n << 5 | n >>> 27) + i | 0,
    a += (n & r | i & ~r) + e[6] - 1069501632 | 0,
    a = (a << 9 | a >>> 23) + n | 0,
    r += (a & i | n & ~i) + e[11] + 643717713 | 0,
    r = (r << 14 | r >>> 18) + a | 0,
    i += (r & n | a & ~n) + e[0] - 373897302 | 0,
    i = (i << 20 | i >>> 12) + r | 0,
    n += (i & a | r & ~a) + e[5] - 701558691 | 0,
    n = (n << 5 | n >>> 27) + i | 0,
    a += (n & r | i & ~r) + e[10] + 38016083 | 0,
    a = (a << 9 | a >>> 23) + n | 0,
    r += (a & i | n & ~i) + e[15] - 660478335 | 0,
    r = (r << 14 | r >>> 18) + a | 0,
    i += (r & n | a & ~n) + e[4] - 405537848 | 0,
    i = (i << 20 | i >>> 12) + r | 0,
    n += (i & a | r & ~a) + e[9] + 568446438 | 0,
    n = (n << 5 | n >>> 27) + i | 0,
    a += (n & r | i & ~r) + e[14] - 1019803690 | 0,
    a = (a << 9 | a >>> 23) + n | 0,
    r += (a & i | n & ~i) + e[3] - 187363961 | 0,
    r = (r << 14 | r >>> 18) + a | 0,
    i += (r & n | a & ~n) + e[8] + 1163531501 | 0,
    i = (i << 20 | i >>> 12) + r | 0,
    n += (i & a | r & ~a) + e[13] - 1444681467 | 0,
    n = (n << 5 | n >>> 27) + i | 0,
    a += (n & r | i & ~r) + e[2] - 51403784 | 0,
    a = (a << 9 | a >>> 23) + n | 0,
    r += (a & i | n & ~i) + e[7] + 1735328473 | 0,
    r = (r << 14 | r >>> 18) + a | 0,
    i += (r & n | a & ~n) + e[12] - 1926607734 | 0,
    i = (i << 20 | i >>> 12) + r | 0,
    n += (i ^ r ^ a) + e[5] - 378558 | 0,
    n = (n << 4 | n >>> 28) + i | 0,
    a += (n ^ i ^ r) + e[8] - 2022574463 | 0,
    a = (a << 11 | a >>> 21) + n | 0,
    r += (a ^ n ^ i) + e[11] + 1839030562 | 0,
    r = (r << 16 | r >>> 16) + a | 0,
    i += (r ^ a ^ n) + e[14] - 35309556 | 0,
    i = (i << 23 | i >>> 9) + r | 0,
    n += (i ^ r ^ a) + e[1] - 1530992060 | 0,
    n = (n << 4 | n >>> 28) + i | 0,
    a += (n ^ i ^ r) + e[4] + 1272893353 | 0,
    a = (a << 11 | a >>> 21) + n | 0,
    r += (a ^ n ^ i) + e[7] - 155497632 | 0,
    r = (r << 16 | r >>> 16) + a | 0,
    i += (r ^ a ^ n) + e[10] - 1094730640 | 0,
    i = (i << 23 | i >>> 9) + r | 0,
    n += (i ^ r ^ a) + e[13] + 681279174 | 0,
    n = (n << 4 | n >>> 28) + i | 0,
    a += (n ^ i ^ r) + e[0] - 358537222 | 0,
    a = (a << 11 | a >>> 21) + n | 0,
    r += (a ^ n ^ i) + e[3] - 722521979 | 0,
    r = (r << 16 | r >>> 16) + a | 0,
    i += (r ^ a ^ n) + e[6] + 76029189 | 0,
    i = (i << 23 | i >>> 9) + r | 0,
    n += (i ^ r ^ a) + e[9] - 640364487 | 0,
    n = (n << 4 | n >>> 28) + i | 0,
    a += (n ^ i ^ r) + e[12] - 421815835 | 0,
    a = (a << 11 | a >>> 21) + n | 0,
    r += (a ^ n ^ i) + e[15] + 530742520 | 0,
    r = (r << 16 | r >>> 16) + a | 0,
    i += (r ^ a ^ n) + e[2] - 995338651 | 0,
    i = (i << 23 | i >>> 9) + r | 0,
    n += (r ^ (i | ~a)) + e[0] - 198630844 | 0,
    n = (n << 6 | n >>> 26) + i | 0,
    a += (i ^ (n | ~r)) + e[7] + 1126891415 | 0,
    a = (a << 10 | a >>> 22) + n | 0,
    r += (n ^ (a | ~i)) + e[14] - 1416354905 | 0,
    r = (r << 15 | r >>> 17) + a | 0,
    i += (a ^ (r | ~n)) + e[5] - 57434055 | 0,
    i = (i << 21 | i >>> 11) + r | 0,
    n += (r ^ (i | ~a)) + e[12] + 1700485571 | 0,
    n = (n << 6 | n >>> 26) + i | 0,
    a += (i ^ (n | ~r)) + e[3] - 1894986606 | 0,
    a = (a << 10 | a >>> 22) + n | 0,
    r += (n ^ (a | ~i)) + e[10] - 1051523 | 0,
    r = (r << 15 | r >>> 17) + a | 0,
    i += (a ^ (r | ~n)) + e[1] - 2054922799 | 0,
    i = (i << 21 | i >>> 11) + r | 0,
    n += (r ^ (i | ~a)) + e[8] + 1873313359 | 0,
    n = (n << 6 | n >>> 26) + i | 0,
    a += (i ^ (n | ~r)) + e[15] - 30611744 | 0,
    a = (a << 10 | a >>> 22) + n | 0,
    r += (n ^ (a | ~i)) + e[6] - 1560198380 | 0,
    r = (r << 15 | r >>> 17) + a | 0,
    i += (a ^ (r | ~n)) + e[13] + 1309151649 | 0,
    i = (i << 21 | i >>> 11) + r | 0,
    n += (r ^ (i | ~a)) + e[4] - 145523070 | 0,
    n = (n << 6 | n >>> 26) + i | 0,
    a += (i ^ (n | ~r)) + e[11] - 1120210379 | 0,
    a = (a << 10 | a >>> 22) + n | 0,
    r += (n ^ (a | ~i)) + e[2] + 718787259 | 0,
    r = (r << 15 | r >>> 17) + a | 0,
    i += (a ^ (r | ~n)) + e[9] - 343485551 | 0,
    i = (i << 21 | i >>> 11) + r | 0,
    t[0] = n + t[0] | 0,
    t[1] = i + t[1] | 0,
    t[2] = r + t[2] | 0,
    t[3] = a + t[3] | 0
}
function l(t) {
  return /[\u0080-\uFFFF]/.test(t) && (t = unescape(encodeURIComponent(t))),
    t
}
function o(t) {
  var e, i, a, o, s, c, l = t.length, u = [1732584193, -271733879, -1732584194, 271733878];
  for (e = 64; e <= l; e += 64)
    n(u, r(t.subarray(e - 64, e)));
  for (t = e - 64 < l ? t.subarray(e - 64) : new Uint8Array(0),
    i = t.length,
    a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    e = 0; e < i; e += 1)
    a[e >> 2] |= t[e] << (e % 4 << 3);
  if (a[e >> 2] |= 128 << (e % 4 << 3),
    e > 55)
    for (n(u, a),
      e = 0; e < 16; e += 1)
      a[e] = 0;
  return o = 8 * l,
    o = o.toString(16).match(/(.*?)(.{0,8})$/),
    s = parseInt(o[2], 16),
    c = parseInt(o[1], 16) || 0,
    a[14] = s,
    a[15] = c,
    n(u, a),
    u
}
f.prototype.append = function (t) {
  return this.appendBinary(l(t))
}
f.prototype.appendBinary = function (t) {
  this._buff += t,
    this._length += t.length;
  var e, r = this._buff.length;
  for (e = 64; e <= r; e += 64)
    n(this._hash, i(this._buff.substring(e - 64, e)));
  return this._buff = this._buff.substring(e - 64),
    this
}
function i(t) {
  var e, n = [];
  for (e = 0; e < 64; e += 4)
    n[e >> 2] = t.charCodeAt(e) + (t.charCodeAt(e + 1) << 8) + (t.charCodeAt(e + 2) << 16) + (t.charCodeAt(e + 3) << 24);
  return n
}
function p(t) {
  var e, n = [], i = t.length;
  for (e = 0; e < i - 1; e += 2)
    n.push(parseInt(t.substr(e, 2), 16));
  return String.fromCharCode.apply(String, n)
}
function c(t) {
  var e;
  for (e = 0; e < t.length; e += 1)
    t[e] = s(t[e]);
  return t.join("")
}
function s(t) {
  var n, i = "";
  for (n = 0; n < 4; n += 1)
    i += e[t >> 8 * n + 4 & 15] + e[t >> 8 * n & 15];
  return i
}
function a(t) {
  var e, r, a, o, s, c, l = t.length, u = [1732584193, -271733879, -1732584194, 271733878];
  for (e = 64; e <= l; e += 64)
    n(u, i(t.substring(e - 64, e)));
  for (t = t.substring(e - 64),
    r = t.length,
    a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    e = 0; e < r; e += 1)
    a[e >> 2] |= t.charCodeAt(e) << (e % 4 << 3);
  if (a[e >> 2] |= 128 << (e % 4 << 3),
    e > 55)
    for (n(u, a),
      e = 0; e < 16; e += 1)
      a[e] = 0;
  return o = 8 * l,
    o = o.toString(16).match(/(.*?)(.{0,8})$/),
    s = parseInt(o[2], 16),
    c = parseInt(o[1], 16) || 0,
    a[14] = s,
    a[15] = c,
    n(u, a),
    u
}
function r(t) {
  var e, n = [];
  for (e = 0; e < 64; e += 4)
    n[e >> 2] = t[e] + (t[e + 1] << 8) + (t[e + 2] << 16) + (t[e + 3] << 24);
  return n
}
function u(t, e) {
  var n, i = t.length, r = new ArrayBuffer(i), a = new Uint8Array(r);
  for (n = 0; n < i; n += 1)
    a[n] = t.charCodeAt(n);
  return e ? a : r
}
function h(t) {
  return String.fromCharCode.apply(null, new Uint8Array(t))
}
export function blockSlice(buff, t, e) {
  return buff.slice ? buff.slice(t, e) : buff.mozSlice ? buff.mozSlice(t, e) : buff.webkitSlice ? buff.webkitSlice(t, e) : null
}
f.prototype.end = function (t) {
  var e, n, i = this._buff, r = i.length, a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (e = 0; e < r; e += 1)
    a[e >> 2] |= i.charCodeAt(e) << (e % 4 << 3);
  return this._finish(a, r),
    n = c(this._hash),
    t && (n = p(n)),
    this.reset(),
    n
}
f.prototype.reset = function () {
  return this._buff = "",
    this._length = 0,
    this._hash = [1732584193, -271733879, -1732584194, 271733878],
    this
}
f.prototype.getState = function () {
  return {
    buff: this._buff,
    length: this._length,
    hash: this._hash.slice()
  }
}
f.prototype.setState = function (t) {
  return this._buff = t.buff,
    this._length = t.length,
    this._hash = t.hash,
    this
}
f.prototype.destroy = function () {
  delete this._hash,
    delete this._buff,
    delete this._length
}
f.prototype._finish = function (t, e) {
  var i, r, a, o = e;
  if (t[o >> 2] |= 128 << (o % 4 << 3),
    o > 55)
    for (n(this._hash, t),
      o = 0; o < 16; o += 1)
      t[o] = 0;
  i = 8 * this._length,
    i = i.toString(16).match(/(.*?)(.{0,8})$/),
    r = parseInt(i[2], 16),
    a = parseInt(i[1], 16) || 0,
    t[14] = r,
    t[15] = a,
    n(this._hash, t)
}

f.hash = function (t, e) {
  return f.hashBinary(l(t), e)
}
f.hashBinary = function (t, e) {
  var n = a(t)
    , i = c(n);
  return e ? p(i) : i
}
f.ArrayBuffer = function () {
  this.reset()
}
f.ArrayBuffer.prototype.append = function (t) {
  var e, i = d(this._buff.buffer, t, !0), a = i.length;
  for (this._length += t.byteLength,
    e = 64; e <= a; e += 64)
    n(this._hash, r(i.subarray(e - 64, e)));
  return this._buff = e - 64 < a ? new Uint8Array(i.buffer.slice(e - 64)) : new Uint8Array(0),
    this
}
function d(t, e, n) {
  var i = new Uint8Array(t.byteLength + e.byteLength);
  return i.set(new Uint8Array(t)),
    i.set(new Uint8Array(e), t.byteLength),
    n ? i : i.buffer
}
f.ArrayBuffer.prototype.end = function (t) {
  var e, n, i = this._buff, r = i.length, a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (e = 0; e < r; e += 1)
    a[e >> 2] |= i[e] << (e % 4 << 3);
  return this._finish(a, r),
    n = c(this._hash),
    t && (n = p(n)),
    this.reset(),
    n
}
f.ArrayBuffer.prototype.reset = function () {
  return this._buff = new Uint8Array(0),
    this._length = 0,
    this._hash = [1732584193, -271733879, -1732584194, 271733878],
    this
}
f.ArrayBuffer.prototype.getState = function () {
  var t = f.prototype.getState.call(this);
  return t.buff = h(t.buff),
    t
}
f.ArrayBuffer.prototype.setState = function (t) {
  return t.buff = u(t.buff, !0),
    f.prototype.setState.call(this, t)
}
f.ArrayBuffer.prototype.destroy = f.prototype.destroy,
f.ArrayBuffer.prototype._finish = f.prototype._finish,
f.ArrayBuffer.hash = function (t, e) {
  var n = o(new Uint8Array(t))
    , i = c(n);
  return e ? p(i) : i
}

export default f;