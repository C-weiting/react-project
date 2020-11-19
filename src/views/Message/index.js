import React from 'react';
import Navigation from '@/components/Navigation';
import Empty from '@/components/Empty';
import './message.less';

function Message () {
    const messageList = [
        {
            time: '2019-2-31 19:36',
            content: '主卧床边左插座 长时间超出最大负载，已主动断电！'
        },
        {
            time: '2019-2-31 19:36',
            content: '主卧床边左插座 长时间超出最大负载，已主动断电！'
        },
        {
            time: '2019-2-31 19:36',
            content: '主卧床边左插座 长时间超出最大负载，已主动断电！'
        },
        {
            time: '2019-2-31 19:36',
            content: '主卧床边左插座 长时间超出最大负载，已主动断电！'
        },
        {
            time: '2019-2-31 19:36',
            content: '主卧床边左插座 长时间超出最大负载，已主动断电！'
        },
        {
            time: '2019-2-31 19:36',
            content: '主卧床边左插座 长时间超出最大负载，已主动断电！'
        },
        {
            time: '2019-2-31 19:36',
            content: '主卧床边左插座 长时间超出最大负载，已主动断电！'
        },
        {
            time: '2019-2-31 19:36',
            content: '主卧床边左插座 长时间超出最大负载，已主动断电！'
        },
    ]

    return (
        <div className="message-content">
            <Navigation title="消息" />
            <div className="message-list-content">
                {
                    messageList.length ? (<ul className="message-list">
                        {
                            messageList.map((item, index) => (
                                <li className="message-item" key={index}>
                                    <div className="message-time">{item.time}</div>
                                    <div className="message-text">{item.content}</div>
                                </li>
                            ))
                        }
                    </ul>) : <Empty pic="https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/empty-message%402x.png" text="暂无消息" />
                }
            </div>
        </div>
    )
}

export default Message;