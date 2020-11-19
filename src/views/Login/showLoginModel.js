import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import QRCode from 'qrcode-react';
import MD5 from 'md5';
import { Modal } from 'antd-mobile';
import './login.less';
import { getUserMsg } from '../../api/user';
import { createStore } from 'redux';
import action from '../../store/action/userInfo';
import rootReducer from '../../store/reducer/index';

let divList = [];

function Login(props) {
  const [modal, setModal] = useState(true);

  function onClose() {
    setModal(false);

    divList.forEach((div) => document.body.removeChild(div));
    divList = [];
  }

  const text = MD5(Math.random());

  console.log(text);

  let userLogin = () => {
    getUserMsg({
      qrCodeId: 'a67f4dc277eb26813198e7c3bed39849',
      source: 'Y-PAD',
    }).then((res) => {
      if (res.success) {
        let { subscribe, dispatch, getState } = createStore(rootReducer);
        dispatch(action.addUserInfo({ ...res.model }));
        console.log(getState());
      }
    });
  };

  userLogin();

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
            onClose();
          },
        },
      ]}
    >
      <div className="login-content">
        <div className="qrcode-bg">
          <div className="qrcode">
            <QRCode
              size={96}
              value={text}
              logo={`https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/small-logo%402x.png`}
              logoWidth={25}
              logoHeight={25}
            />
          </div>
        </div>
        <div className="infoTag">
          下载新橙社APP，进入APP首页点击右上角扫码登录
        </div>
      </div>
    </Modal>
  );
}

function showLoginModel(...args) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  divList.push(div);
  ReactDOM.render(<Login {...args} />, div);

  return () => {
    document.body.removeChild(div);
  };
}

export default showLoginModel;
