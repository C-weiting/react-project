import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import QRCode from 'qrcode-react';
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
                    <QRCode
                        size={150}
                        value={`https://www.baidu.com`}
                        logo={`https://www.baidu.com/img/baidu_jgylogo3.gif`}
                        logoWidth={50}
                        logoHeight={50}
                    />
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