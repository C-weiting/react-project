import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd-mobile';
import './login.less';
import store from '@/store';
import action from '../../store/action/userInfo';
import showLoginModel from './showLoginModel';
import { unBindingUserClientid } from '@/api/bindingUserClientid';
import { CustomInfo } from '@/components/CustomToast';
import * as actionTypes from '@/store/action-types';

let divList = [];

function LoginInfo(props) {
  const [modal, setModal] = useState(true);
  const userInfo = store.getState().userInfo;
  const { clientId } = store.getState().client;
  const [isConfirm, setIsConfirm] = useState(false);
  function onClose() {
    setModal(false);

    divList.forEach((div) => document.body.removeChild(div));
    divList = [];

    console.log(isConfirm);
    // if (!isConfirm) {
    store.dispatch(action.clearUserInfo());
    // }

    // let params = {
    //   custId: userInfo.custId,
    //   clientId: clientId,
    //   bindType: 'Y-PAD'
    // }

    // unBindingUserClientid(params).then(res => {
    //   // CustomInfo(JSON.stringify(res), 10);
    // });

    store.dispatch({ type: actionTypes.CLEAR_MESSAGELIST }); //退出登录后清除前端页面消息缓存
  }
  function onCancel(params) {
    setModal(false);

    divList.forEach((div) => document.body.removeChild(div));
    divList = [];
  }

  return (
    <Modal
      visible={modal}
      transparent
      onClose={onClose}
      className="model-login-info"
      footer={[
        {
          text: '切换地址',
          onPress: () => {
            onClose();
            showLoginModel();
          },
        },
        {
          text: '确认登陆',
          onPress: () => {
            setIsConfirm(true);
            // store.dispatch(action.clearUserInfo());
            onCancel();
          },
        },
      ]}
    >
      <div className="login-info-content">
        <div className="title">账户信息</div>
        <ul className="info-list">
          <li>账号名：{userInfo.custNickName}</li>
          <li>
            定位地址：
            {userInfo.cityName + userInfo.blockName + userInfo.houseAddress}
          </li>
          <li>手机号： {userInfo.custPhone}</li>
        </ul>
      </div>
    </Modal>
  );
}

function showConfirmLoginModel(...args) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  divList.push(div);
  ReactDOM.render(<LoginInfo {...args} />, div);

  return () => {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  };
}

export default showConfirmLoginModel;
