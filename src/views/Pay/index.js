import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import QRCode from 'qrcode-react';
import { Modal } from 'antd-mobile';
import './pay.less';

let divList = [];

function Pay (props) {
    const [modal, setModal] = useState(true);
    const [text, setText] = useState('123456');

    function onClose() {
        setModal(false)

        divList.forEach(div => document.body.removeChild(div));
        divList = [];
    }

    return (
        <Modal
            visible={modal}
            transparent
            maskClosable={false}
            onClose={onClose}
            className="model-pay"
            footer={[{ text: '取消', onPress: () => { onClose() } }]}
        >
           <div className="pay-model-content">
               <div className="address">
                   <span className="addressIcon"></span>
                   缴费房屋：常州帝景002单位001栋101室
                </div>
                <div className="qrcode">
                    <QRCode
                        size={96}
                        value={text}
                        logo={`https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/small-logo%402x.png`}
                        logoWidth={25}
                        logoHeight={25}
                    />
                </div>
                <div className="pay-type">
                    <span className="wechat"></span>
                    <span className="alipay"></span>
                    <span className="text">扫码支付</span>
                </div>
            </div>
        </Modal>
    )
}

function showPayModel(...args) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    divList.push(div);
    ReactDOM.render(<Pay {...args} />, div);

    return () => {
        document.body.removeChild(div);
    }
}

export default showPayModel;