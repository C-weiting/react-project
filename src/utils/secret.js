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
