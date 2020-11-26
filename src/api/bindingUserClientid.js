import http from '../utils/http';

/**
 * 绑定 ClientID
 */
function bindingUserClientid(params){
  return new Promise((resolve, reject) => {
    http("post",'/message/message/bindingUserClientid.json',params).then(res => {
      resolve (res);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  }) 
}

/**
 * 解绑 ClientID
 */
function unBindingUserClientid(params){
    return new Promise((resolve, reject) => {
      http("post",'/message/message/unBindingUserClientid.json',params).then(res => {
        resolve (res);
      },error => {
        console.log("网络异常~",error);
        reject(error)
      })
    }) 
  }

export {
    bindingUserClientid,
    unBindingUserClientid
}