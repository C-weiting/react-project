/**
 * 网络请求配置
 */
import axios from 'axios';
import { Base64 } from 'js-base64';
import { DESEncrypt, DESDecrypt, md5Sign, md5Timestamp, md5 } from './secret';
import Qs from 'qs';
import { CustomFail } from '@/components/CustomToast';

axios.defaults.timeout = 100000;
// axios.defaults.baseURL = '/api';
const argraceBaseUrl = '/'
// axios.defaults.baseURL = 'http://61.132.109.16:8088/';
// axios.defaults.baseURL= process.env.NODE_ENV==='development'?'/api':'http://47.115.191.251:8089/proxy'
// axios.defaults.baseURL= process.env.NODE_ENV==='development'?'/api':'http://61.132.109.16:8099/'
// axios.defaults.baseURL = 'http://61.132.109.16:8099/';
axios.defaults.baseURL = 'https://xcs-mobile.xincheng.com/';

/**
 * http request 拦截器
 */
axios.interceptors.request.use(
  (config) => {
    if (config.url.indexOf('/obms-pos') !== -1) {
      let timestamp = md5Timestamp;
      let baseString = `${config.data.data}${timestamp}${md5}`;
      let sign = md5Sign(baseString);
      config.params = config.data;
      delete config.params.data;
      config.headers = {
        sign: sign,
        timestamp: timestamp
      };
      return config;
    }
    if (config.url.indexOf('/argraceApi') !== -1) {
      config.url = config.url.slice(11, config.url.length)
      config.baseURL = argraceBaseUrl
      console.log(config);
      return config
    }
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    config.data = Qs.stringify({
      secretMsg: DESEncrypt(JSON.stringify(config.data)),
      fromH5: true,
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      if (response.data.showapi_res_body) {
        return response;
      }
      if (response.config.url.indexOf('/obms-pos') !== -1) {
        return response;
      }
      if (response.data.errCode === 2) {
        console.log('过期');
      }
      response.data = JSON.parse(DESDecrypt(response.data));
    } else {

    }
    return response;
  },
  (error) => {
    console.log('请求出错：', error);
  }
);

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((response) => {
        landing(url, params, response.data);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post (url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => {
        if (response && response.data) {
          //关闭进度条
          resolve(response.data);
        } else {
          // CustomFail('请求出错');
        }
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}

//统一接口处理，返回数据
export default function http (fecth, url, param) {
  return new Promise((resolve, reject) => {
    switch (fecth) {
      case 'get':
        console.log('begin a get request,and url:', url);
        get(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.log('get request GET failed.', error);
            reject(error);
          });
        break;
      case 'post':
        post(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.log('get request POST failed.', error);
            reject(error);
          });
        break;
      default:
        break;
    }
  });
}

//失败提示
function msag (err) {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        alert(err.response.data.error.details);
        break;
      case 401:
        alert('未授权，请登录');
        break;

      case 403:
        alert('拒绝访问');
        break;

      case 404:
        alert('请求地址出错');
        break;

      case 408:
        alert('请求超时');
        break;

      case 500:
        alert('服务器内部错误');
        break;

      case 501:
        alert('服务未实现');
        break;

      case 502:
        alert('网关错误');
        break;

      case 503:
        alert('服务不可用');
        break;

      case 504:
        alert('网关超时');
        break;

      case 505:
        alert('HTTP版本不受支持');
        break;
      default:
    }
  }
}

/**
 * 查看返回的数据
 * @param url
 * @param params
 * @param data
 */
function landing (url, params, data) {
  if (data.code === -1) {
  }
}
