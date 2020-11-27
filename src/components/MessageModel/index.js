import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd-mobile';
import './message-model.less';

let divList = [];

function MessageModel (props) {
    const [modal, setModal] = useState(true);

    function onClose () {
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
            className="model-message"
            footer={[
                {
                    text: '知道了',
                    onPress: () => {
                        onClose();
                    },
                }
            ]}
        >
            <div className="message-model-content">
                <div className="title">{props.title}</div>
                <div className="time">{props.createTime}</div>
                <div className="message-text">{props.content}</div>
            </div>
        </Modal>
    )
}

function showMessageModel (params) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    divList.push(div);
    ReactDOM.render(<MessageModel {...params} />, div);

    return () => {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
    };
}

export default showMessageModel;