import React, { useMemo } from 'react';
import { SwipeAction } from 'antd-mobile';
import { useSelector, useDispatch } from 'react-redux';
import Empty from '@/components/Empty';
import * as actionTypes from '@/store/action-types';
import * as eventActionTypes from '@/event/action-types';

export default function HomeRight () {
    const { cacheMessageList, pushMessageList } = useSelector(state => state.message);
    const messageList = useMemo(
        () =>
            [...cacheMessageList, ...pushMessageList],
        [cacheMessageList, pushMessageList]
    );
    const dispatch = useDispatch();

    function handleReadMessage (message) {
        dispatch({ type: actionTypes.READ_MESSAGE, payload: message.messageId });
        if (window.android != null && typeof (window.android) != "undefined") {
            const data = {
                method: eventActionTypes.SET_MEG_READ,
                object: {
                    messageId: message.messageId
                }
            }
            window.android.callAndroid(JSON.stringify(data));
        }
    }

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

                                messageList.map((item, index) => {
                                    let message = {
                                        ...JSON.parse(item.content),
                                        messageId: item.messageId,
                                        isRead: item.isRead
                                    }
                                    return (
                                        <SwipeAction
                                            autoClose
                                            right={[
                                                {
                                                    text: '移出',
                                                    onPress: () => handleReadMessage(message),
                                                    style: { backgroundColor: '#F2543F', color: '#ffffff', fontSize: '0.09375rem', width: '0.78125rem', borderRadius: '0.0625rem', marginLeft: '0.078125rem' },
                                                },
                                            ]}
                                            onOpen={() => console.log('global open')}
                                            onClose={() => console.log('global close')}
                                            style={{ marginBottom: '0.09375rem' }}
                                            key={message.messageId}
                                        >
                                            <li className="message-item">
                                                <div className="message-item-info">
                                                    <i className="iconfont iconshineihuti"></i>
                                                    <div className="message-item-info-content">
                                                        <div className="title">
                                                            <span className="message-type">{message.title}</span>
                                                            <span className="message-time">1分钟前</span>
                                                        </div>
                                                        <div className="info">
                                                            {message.content}
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </SwipeAction>
                                    )
                                })
                            }
                        </ul> :
                        <Empty pic="https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/empty-message%402x.png" text="暂无消息" />
                }
            </div>
        </>
    )
}