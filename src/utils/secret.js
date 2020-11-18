import { Base64 } from 'js-base64';

const CryptoJS = require('crypto-js'); 

const key = CryptoJS.enc.Utf8.parse(
  //   Base64.decode('t96IBJWTOMIMWOzdjQ36pw==')
  CryptoJS.enc.Base64.parse('t96IBJWTOMIMWOzdjQ36pw==')
).toString();

//加密方法
export function encrypt(word) {
  console.log(key, 'key');
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    // iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}
//解密方法
export function decrypt(word) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, {
    // iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

// export default {
//   decrypt,
//   encrypt,
// };
