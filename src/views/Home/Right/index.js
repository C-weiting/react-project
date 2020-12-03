import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { SwipeAction } from 'antd-mobile';
import { useDispatch } from 'react-redux';
import Empty from '@/components/Empty';
import useMessageList from '@/hooks/useMessageList';
import messageClick from '@/utils/messageClick';
import { showTime } from '@/utils';
import * as actionTypes from '@/store/action-types';
import * as eventActionTypes from '@/event/action-types';

export default function HomeRight () {
    const messageList = useMessageList();
    const dispatch = useDispatch();
    const history = useHistory();
    const unreadMessage = useMemo(() => (
        messageList.filter(item => !item.isRead)
    ), [messageList]);
    const iconMap = {
        10090: 'iconwuyetongzhi',
        10091: 'iconqianfeitongzhi',
        10092: 'iconjiaofeichenggong',
    }

    function handleRemoveMessage (message) {
        dispatch({ type: actionTypes.SET_MEG_REMOVE, payload: message.messageId });
        if (window.android != null && typeof (window.android) != "undefined") {
            const data = {
                method: eventActionTypes.SET_MEG_REMOVE,
                object: {
                    messageId: message.messageId
                }
            }
            window.android.callAndroid(JSON.stringify(data));
        }
    }

    function handleClick (item) {
        messageClick(item, dispatch, history);
    }

    return (
        <>
            <div className="message-header">
                <img src="https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/message%402x.png" className="pic" alt="" />
                <div className="text">
                    <h1 className="title">你有重要消息</h1>
                    <h4 className="subtitle">{unreadMessage.length}个未读</h4>
                </div>
            </div>
            <div className={`message-list-wrapper ${messageList.length === 0 && 'short'}`} >
                {
                    messageList.length ?
                        <ul className="message-list">
                            {

                                messageList.filter(item => !item.isRead).filter(item => !item.isRemove).sort((a, b) => b.createTime - a.createTime).map((item, index) => {
                                    let message = {
                                        ...item,
                                        ...JSON.parse(item.content)
                                    }
                                    return (
                                        <SwipeAction
                                            autoClose
                                            right={[
                                                {
                                                    text: '移出',
                                                    onPress: () => handleRemoveMessage(message),
                                                    style: { backgroundColor: '#F2543F', color: '#ffffff', fontSize: '0.09375rem', width: '0.78125rem', borderRadius: '0.0625rem', marginLeft: '0.078125rem' },
                                                },
                                            ]}
                                            onOpen={() => console.log('global open')}
                                            onClose={() => console.log('global close')}
                                            style={{ marginBottom: '0.09375rem' }}
                                            key={message.messageId}
                                        >
                                            <li className="message-item" onClick={() => handleClick(message)}>
                                                <div className="message-item-info">
                                                    <i className={`iconfont ${iconMap[message.type]}`}></i>
                                                    <div className="message-item-info-content">
                                                        <div className="title">
                                                            <span className="message-type">{message.title}</span>
                                                            <span className="message-time">{showTime(message.createTime)}</span>
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