import http from '../utils/http';

/**
 * 获取首页列表
 */
function getArticleList(){
  return new Promise((resolve, reject) => {
    http("get",'/home/msg/data/personalcontent?num=8&indextype=manht&_req_seqid=4045409297&asyn=1&t=1605177109061&sid=32809_1462_33103_32946_33059_31660_32706_32962_31709_26350').then(res => {
      resolve (res);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  }) 
}

export {
   getArticleList
}
