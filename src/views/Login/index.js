import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import QRCode from 'qrcode-react';
import MD5 from 'md5';
import { Modal } from 'antd-mobile';
import './login.less';

let divList = [];

function Login (props) {
    const [modal, setModal] = useState(true);

    function onClose () {
        setModal(false)

        divList.forEach(div => document.body.removeChild(div));
        divList = [];
    }

    const text = MD5(Math.random());

    console.log(text);

    return (
        <Modal
            visible={modal}
            transparent
            maskClosable={false}
            onClose={onClose}
            className="model-login"
            footer={[{ text: '取消', onPress: () => { onClose() } }]}
        >
            <div className="login-content">
                <div className="qrcode-bg">
                    <div className="qrcode">
                        <QRCode
                            size={192}
                            value={text}
                            logo={`https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/small-logo%402x.png`}
                            logoWidth={50}
                            logoHeight={50}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

function showLoginModel (...args) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    divList.push(div);
    ReactDOM.render(<Login {...args} />, div);

    return () => {
        document.body.removeChild(div);
    }
}

export default showLoginModel;