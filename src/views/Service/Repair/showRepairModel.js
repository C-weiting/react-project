import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd-mobile';
import './model.less';
import store from '@/store';
import { addWorkOrder } from '../../../api/service';

let divList = [];

function LoginInfo(props) {
  const [modal, setModal] = useState(true);

  function onClose() {
    setModal(false);

    divList.forEach((div) => document.body.removeChild(div));
    divList = [];
  }

  const userInfo = store.getState().userInfo;
  // const address = store.getState().userInfo.houseAddress;
  // console.log(userInfo);

  function onCommit() {
    addWorkOrder({
      appUser: userInfo.custNickName,
      houseId: userInfo.houseId,
      phone: userInfo.custPhone,
      deviceNumber: userInfo.deviceId,
      appUserId: userInfo.custId,
      address: userInfo.houseAddress,
      thirdHouseId: userInfo.thirdHouseid,
      community: userInfo.blockId,
      orderType: 1,
    }).then((res) => {
      console.log(res);
      onClose();
    });
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
          text: '取消',
          onPress: () => {
            onClose();
          },
        },
        {
          text: '确认提交',
          onPress: () => {
            onCommit();
          },
        },
      ]}
    >
      <div className="login-info-content">
        <div className="title">报事保修确认</div>
        <ul className="info-list">
          <li>房屋地址：{userInfo.houseAddress}</li>
          <li>手机号： 136*****121</li>
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
