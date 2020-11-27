import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd-mobile';
import './model.less';
import store from '@/store';
import { addWorkOrder } from '../../../api/service';
import { CustomSuccess, CustomFail } from '../../../components/CustomToast';

let divList = [];

function LoginInfo(props) {
  const [modal, setModal] = useState(true);

  function onClose() {
    setModal(false);

    divList.forEach((div) => document.body.removeChild(div));
    divList = [];
  }

  const userInfo = store.getState().userInfo;

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
      orderType: 3,
    }).then((res) => {
      console.log(res);
      if (res.success === true) {
        CustomSuccess('操作成功');
        onClose();
      } else {
        CustomFail('您的操作太频繁，请稍后再试一下');
        onClose();
      }
    });
  }
  return (
    <Modal
      visible={modal}
      transparent
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
        <div className="title">投诉举报确认</div>
        <ul className="info-list">
          <li>房屋地址：{userInfo.houseAddress}</li>
          <li>联系电话： {userInfo.custPhone}</li>
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
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  };
}

export default showLoginInfoModel;
