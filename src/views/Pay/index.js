import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd-mobile';

let divList = [];

function Pay (props) {
    const [modal, setModal] = useState(true);

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
            footer={[{ text: '取消', onPress: () => { onClose() } }]}
        >
            <div>
                
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