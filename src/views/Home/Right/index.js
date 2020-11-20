import React, { useState, useEffect } from 'react';
import { SwipeAction } from 'antd-mobile';
// import { CustomInfo } from '@/components/CustomToast';
import eventBus from '@/event/EventBus';
import Empty from '@/components/Empty';

export default function HomeRight () {
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        const fn = (data) => {
            // CustomInfo(JSON.stringify(data) + 111111111111111111, 20)
            let newMessageList = [...messageList];
            newMessageList.unshift(data)
            setMessageList(newMessageList);
        }

        eventBus.on('10090', fn);
        eventBus.on('10091', fn);
        eventBus.on('10092', fn);

        return () => {
            eventBus.off('10090', fn);
            eventBus.off('10091', fn);
            eventBus.off('10092', fn);
        }
    }, [messageList])

    return (
        <>
            <div className="message-header">
                <img src="https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/message%402x.png" className="pic" alt="" />
                <div className="text">
                    <h1 className="title">你有重要消息</h1>
                    <h4 className="subtitle">{messageList.length}个未读</h4>
                </div>
            </div>
            <div className={`message-list-wrapper ${messageList.length === 0 && 'short'}`} >
                {
                    messageList.length ?
                        <ul className="message-list">
                            {

                                messageList.map((item, index) => (
                                    <SwipeAction
                                        autoClose
                                        right={[
                                            {
                                                text: '移出',
                                                onPress: () => console.log('delete'),
                                                style: { backgroundColor: '#F2543F', color: '#ffffff', fontSize: '0.09375rem', width: '0.78125rem', borderRadius: '0.0625rem', marginLeft: '0.078125rem' },
                                            },
                                        ]}
                                        onOpen={() => console.log('global open')}
                                        onClose={() => console.log('global close')}
                                        style={{ marginBottom: '0.09375rem' }}
                                        key={index}
                                    >
                                        <li className="message-item">
                                            <div className="message-item-info">
                                                <i className="iconfont iconshineihuti"></i>
                                                <div className="message-item-info-content">
                                                    <div className="title">
                                                        <span className="message-type">{item.title}</span>
                                                        <span className="message-time">1分钟前</span>
                                                    </div>
                                                    <div className="info">
                                                        {item.content}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </SwipeAction>
                                ))
                            }
                        </ul> :
                        <Empty pic="https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/empty-message%402x.png" text="暂无消息" />
                }
            </div>
        </>
    )
}