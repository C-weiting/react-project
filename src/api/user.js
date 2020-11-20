import http from '../utils/http';

/**
 * 获取登陆用户信息
 */
function getUserMsg(params){
  return new Promise((resolve, reject) => {
    http("post",'/customer/customer/queryQrCodeAuth.json',params).then(res => {
      resolve (res);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  }) 
}

export {
    getUserMsg
}
