import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// import QRCode from 'qrcode-react';
import { Modal } from 'antd-mobile';
import './pay.less';
import store from '@/store';
import QRCode from 'qrcode.react';

let divList = [];

function Pay(props) {
  const [modal, setModal] = useState(true);

  console.log(props);

  function onClose() {
    setModal(false);

    divList.forEach((div) => document.body.removeChild(div));
    divList = [];
  }

  return (
    <Modal
      visible={modal}
      transparent
      onClose={onClose}
      className="model-pay"
      footer={[
        {
          text: '取消',
          onPress: () => {
            onClose();
          },
        },
      ]}
    >
      <div className="pay-model-content">
        <div className="address">
          <span className="addressIcon"></span>
          缴费房屋：
          {store.getState().userInfo.cityName +
            store.getState().userInfo.blockName +
            store.getState().userInfo.houseAddress}
        </div>
        <div className="qrcode">
          {/* <QRCode
            size={96}
            value={text}
            logo={`https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/small-logo%402x.png`}
            logoWidth={25}
            logoHeight={25}
          /> */}
          <QRCode className="codeImg" size={96} value={props[0]} level="L" />
        </div>
        <div className="pay-type">
          <span className="wechat"></span>
          <span className="alipay"></span>
          <span className="text">扫码支付</span>
        </div>
      </div>
    </Modal>
  );
}

function showPayModel(...args) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.render(<Pay {...args} />, div);
  divList.push(div);

  return () => {
    divList = divList.filter((cdiv) => cdiv !== div);
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  };
}

export default showPayModel;
