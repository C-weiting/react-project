import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd-mobile';
import './login.less';
import store from '@/store';
import action from '../../store/action/userInfo';
import showLoginModel from './showLoginModel';

let divList = [];

function LoginInfo(props) {
  const [modal, setModal] = useState(true);
  const userInfo = store.getState().userInfo;

  function onClose() {
    setModal(false);

    divList.forEach((div) => document.body.removeChild(div));
    divList = [];
  }

  return (
    <Modal
      visible={modal}
      transparent
      maskClosable={false}
      onClose={onClose}
      className="model-login-info"
      footer={[
        {
          text: '切换地址',
          onPress: () => {
            store.dispatch(action.clearUserInfo());
            onClose();
            showLoginModel();
          },
        },
        {
          text: '退出登录',
          onPress: () => {
            store.dispatch(action.clearUserInfo());
            onClose();
          },
        },
      ]}
    >
      <div className="login-info-content">
        <div className="title">账户信息</div>
        <ul className="info-list">
          <li>账号名：{userInfo.custNickName}</li>
          <li>定位地址：{userInfo.houseAddress}</li>
          <li>手机号： {userInfo.custPhone}</li>
        </ul>
      </div>
    </Modal>
  );
}

function showLoginInfoModel(...args) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  divList.push(div);
  ReactDOM.render(<LoginInfo {...args} />, div);

  return () => {
    document.body.removeChild(div);
  };
}

export default showLoginInfoModel;
