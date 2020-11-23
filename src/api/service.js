import http from '../utils/http';

/**
 * 获取登陆用户信息
 */
function addWorkOrder(params) {
  return new Promise((resolve, reject) => {
    http('post', '/cwy/appWorkOrder/workOrderSubmitFromYPad.json', params).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        console.log('网络异常~', error);
        reject(error);
      }
    );
  });
}
/**
 * 获取账单列表
 */
function getOrderList(params) {
  return new Promise((resolve, reject) => {
    http('post', '/obms-pos/user/getNotPaymentOrderListByThirdHouseId', params).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        console.log('网络异常~', error);
        reject(error);
      }
    );
  });
}
/**
 * 生成账单
 */
function createPayOrder(params) {
  return new Promise((resolve, reject) => {
    http('post', '/obms-pos/order/generatingOrder', params).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        console.log('网络异常~', error);
        reject(error);
      }
    );
  });
}

export { addWorkOrder, getOrderList ,createPayOrder};
