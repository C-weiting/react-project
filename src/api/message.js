import http from '../utils/http';

/**
 * 小区公告详情
 */
function getPropertyBlockInformationPicDetail(params){
  return new Promise((resolve, reject) => {
    http("post",'/property/property/getPropertyBlockInformationPicDetail.json',params).then(res => {
      resolve (res);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  }) 
}

/**
 * 查询已缴纳账单详情接口
 */
function queryPropertyOrderDetail(params){
  return new Promise((resolve, reject) => {
    http("post",'/obms-pos/order/queryPropertyOrderDetail',params).then(res => {
      resolve (res);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  }) 
}

export {
    getPropertyBlockInformationPicDetail,
    queryPropertyOrderDetail
}