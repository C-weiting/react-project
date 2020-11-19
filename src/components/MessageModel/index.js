import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd-mobile';
import './message-model.less';

let divList = [];

function MessageModel () {
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
                <div className="title">社区通知</div>
                <div className="time">2020/11/09 18:05:20</div>
                <div className="message-text">
                    11月9日18:00，上海举行新闻发会，上海市卫生健康委主任邬惊雷、浦东新区副区长李国华、上海市疫情防控公共卫生专家组成员复11月9日18:00，上海举行新闻发会，上海市卫生健康委主任邬惊雷、浦东新区副区长李国华、上海市疫情防控公共卫生专家组成员复11月9日18:00，上海举行新闻发会，上海市卫生健康委主任邬惊雷、浦东新区副区长李国华、上海市疫情防控公共卫生专家组成员复
                </div>
            </div>
        </Modal>
    )
}

function showMessageModel (...args) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    divList.push(div);
    ReactDOM.render(<MessageModel {...args} />, div);

    return () => {
        document.body.removeChild(div);
    };
}

export default showMessageModel;