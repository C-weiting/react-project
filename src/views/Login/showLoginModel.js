import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import QRCode from 'qrcode.react';
// import QRCode from 'qrcode-react';
import MD5 from 'md5';
import { Modal } from 'antd-mobile';
import './login.less';
import { getUserMsg } from '../../api/user';
import { createStore } from 'redux';
import action from '../../store/action/userInfo';
import rootReducer from '../../store/reducer/index';
import { useStore } from 'react-redux';
import store from '@/store';
import * as eventActionTypes from '@/event/action-types';
import { CustomSuccess, CustomFail } from '../../components/CustomToast';


let divList = [];

function Login (props) {
  const [modal, setModal] = useState(true);

  function onClose () {
    setModal(false);

    divList.forEach((div) => document.body.removeChild(div));
    divList = [];
  }

  const text = MD5(Math.random());
  const qrText = JSON.stringify({
    type: 2, //Y-PAD登录二维码
    qrCodeId: text, // 二维码标识
    expireTimeMills: '90000', // 二维码过期时间的毫秒值
    source: 'Y-PAD', //二维码来源 Y-PAD
  });
  let userLogin = () => {};
  useEffect(() => {
    let timer = setInterval(() => {
      // userLogin();
      getUserMsg({
        qrCodeId: text,
        // qrCodeId: 'a67f4dc277eb26813198e7c3bed39840',
        source: 'Y-PAD',
      }).then((res) => {
        if (res.model) {
          console.log(res);
          store.dispatch(action.addUserInfo({ ...res.model }));

          if (window.android != null && typeof window.android != 'undefined') {
            const data = {
              method: eventActionTypes.SET_PUSH_PHONE,
              object: {
                phone: res.model.custPhone,
              },
            };
            window.android.callAndroid(JSON.stringify(data));
          }

          if (window.android != null && typeof window.android != 'undefined') {
            const data = {
              method: eventActionTypes.GET_MSG_LIST,
            };
            window.android.callAndroid(JSON.stringify(data));
          }
          CustomSuccess('操作成功');
          onClose();
        }
      });
      if (Object.keys(store.getState().userInfo).length > 0) {
        clearInterval(timer);
        timer = null;
      }
    }, 1000);
    return () => {
      clearInterval(timer);
      timer = null;
    };
  }, []);

  return (
    <Modal
      visible={modal}
      transparent
      maskClosable={false}
      onClose={onClose}
      className="model-login"
      footer={[
        {
          text: '取消',
          onPress: () => {
            CustomFail('取消登陆')
            onClose();
          },
        },
      ]}
    >
      <div className="login-content">
        <div className="qrcode-bg">
          <div className="qrcode-header"></div>
          <div className="qrcode">
            <QRCode size={96} value={qrText} level="L" />
          </div>
        </div>
        <div className="infoTag">
          下载新橙社APP，进入APP首页点击右上角扫码登录
        </div>
      </div>
    </Modal>
  );
}

function showLoginModel (...args) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  divList.push(div);
  ReactDOM.render(<Login {...args} />, div);

  return () => {
    document.body.removeChild(div);
  };
}

export default showLoginModel;
