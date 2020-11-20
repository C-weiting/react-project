import CryptoJS from 'crypto-js';

// 加密
export function DESEncrypt(data) {
  var key = '958TkI*&';
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var ivHex = CryptoJS.enc.Utf8.parse(key);
  var encrypted = CryptoJS.DES.encrypt(CryptoJS.enc.Utf8.parse(data), keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encodeURIComponent(encrypted.toString());
}
// 解密
export function DESDecrypt(data) {
  var key = '958TkI*&';
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var ivHex = CryptoJS.enc.Utf8.parse(key);
  var decrypted = CryptoJS.DES.decrypt(data, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  var dataBase64 = decrypted.toString(CryptoJS.enc.Utf8);

  return dataBase64;
}
export const md5 = 'V8LA3r279vEDR58tQ4GURozhpK8EkQfG';
export const md5Timestamp = new Date().getTime();

export function md5Sign(data) {
  // 加入字符编码
  // let md5 = CryptoJS.createHash('md5').update(data, 'utf-8').digest('hex');
  let md5 = CryptoJS.MD5(data).toString().toLowerCase();
  return md5;
}
