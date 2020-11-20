import http from '../utils/http';

/**
 * 获取天气信息
 */
export function getWeather(){
  return new Promise((resolve, reject) => {
    http("get",'http://route.showapi.com/9-2', {
      showapi_appid: 57347,
      area:'杭州',
      showapi_sign:'a0e028a5b4534d629a7ad19c139226cd',
      needMoreDay:0,
      needIndex:0,
      needHourData:0,
      need3HourgForcast:0,
      needAlarm:0
    }).then(res => {
      resolve (res);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  }) 
}