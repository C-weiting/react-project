import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd-mobile';
import './message-model.less';

let divList = [];

function MessageConfirmModel (props) {
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
            onClose={onClose}
            footer={[
                {
                    text: '稍后再说',
                    onPress: () => {
                        onClose();
                    },
                },
                {
                    text: '查看账单',
                    onPress: () => {
                        onClose();
                        props.cb()
                    },
                },
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

function showMessageConfirmModel (params, cb) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    divList.push(div);
    ReactDOM.render(<MessageConfirmModel {...params} cb={cb} />, div);

    return () => {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
    };
}

export default showMessageConfirmModel;