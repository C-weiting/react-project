import React from 'react';
import Navigation from '@/components/Navigation';
import Empty from '@/components/Empty';
import showMessageModel from '@/components/MessageModel';
import useMessageList from '@/hooks/useMessageList';
import { showTime } from '@/utils';
import { getPropertyBlockInformationPicDetail } from '@/api/message';
import './message.less';

function Message () {
    const messageList = useMessageList();

    function handleClick (item) {
        let params = {
            informationId: item.id1,
            sourceType: 1
        }
        getPropertyBlockInformationPicDetail(params).then(res => {
            if (res.success && res.model) {
                const { title, createTime, detailList } = res.model;
                if (detailList && detailList.length) {
                    let messageDetail = {
                        title: title,
                        createTime: createTime,
                        content: detailList[0].note
                    }
                    showMessageModel(messageDetail);
                }
            }
        });
    }

    return (
        <div className="message-content">
            <Navigation title="消息" />
            <div className="message-list-content">
                {
                    messageList.length ? (<ul className="message-list">
                        {
                            messageList.filter(item => !item.isRead).map((item, index) => {
                                let message = {
                                    ...item,
                                    ...JSON.parse(item.content)
                                }
                                return (
                                    <li className="message-item" key={index} onClick={() => handleClick(message)}>
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