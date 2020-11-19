import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd-mobile';
import './login.less';

let divList = [];

function LoginInfo(props) {
  const [modal, setModal] = useState(true);

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
            onClose();
          },
        },
        {
          text: '退出登录',
          onPress: () => {
            onClose();
          },
        },
      ]}
    >
      <div className="login-info-content">
        <div className="title">账户信息</div>
        <ul className="info-list">
          <li>账号名：社员001</li>
          <li>定位地址：常州 新城公馆001单元001栋201室</li>
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
