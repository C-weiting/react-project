import React from 'react';
import { useDispatch } from 'react-redux';
import Navigation from '@/components/Navigation';
import Empty from '@/components/Empty';
import useMessageList from '@/hooks/useMessageList';
import useMessageSub from '@/hooks/useMessageSub';
import messageClick from '@/utils/messageClick';
import { showTime } from '@/utils';
import './message.less';

function Message () {
    const messageList = useMessageList();
    const dispatch = useDispatch();
    useMessageSub();
    
    // handleClick({type: 10092, id1: 6491})
    function handleClick (item) {
        messageClick(item, dispatch);
    }

    return (
        <div className="message-content">
            <Navigation title="消息" />
            <div className="message-list-content">
                {
                    messageList.length ? (<ul className="message-list">
                        {
                            messageList.sort((a, b) => b.createTime - a.createTime).map((item, index) => {
                                let message = {
                                    ...item,
                                    ...JSON.parse(item.content)
                                }
                                return (
                                    <li className={`message-item ${!item.isRead && 'noRead'}`} key={index} onClick={() => handleClick(message)}>
                                        <div className="message-time">{showTime(message.createTime)}</div>
                                        <div className="message-text">{message.content}</div>
                                    </li>
                                )
                            })
                        }
                    </ul>) : <Empty pic="https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/empty-message%402x.png" text="暂无消息" />
                }
            </div>
        </div>
    )
}

export default Message;