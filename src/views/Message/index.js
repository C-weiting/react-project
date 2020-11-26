import React from 'react';
import Navigation from '@/components/Navigation';
import Empty from '@/components/Empty';
import showMessageModel from '@/components/MessageModel';
import useMessageList from '@/hooks/useMessageList';
import useMessageSub from '@/hooks/useMessageSub';
import { showTime } from '@/utils';
import { CustomFail } from '@/components/CustomToast';
import { getPropertyBlockInformationPicDetail, queryPropertyOrderDetail } from '@/api/message';
import './message.less';

function Message () {
    const messageList = useMessageList();
    useMessageSub();
    // handleClick({type: 10092, id1: 6491})

    function handleClick (item) {
        if (parseInt(item.type) === 10092) { // 已缴费通知
            const orderId = item.id1; // 12011181533601682
            let params = {
                orderId: orderId,
                data: `orderId=${orderId}`
            }
            queryPropertyOrderDetail(params).then(res => {
                if (res.success && res.model) {
                    let { propertyBillList, orderId, paymentTime, paymentTypeName, paymentChannelName } = res.model
                    if (propertyBillList && propertyBillList.length) {
                        const { subBillMonth, subFeeName } = propertyBillList[0];

                        let messageDetail = {
                            title: '已缴费通知',
                            createTime: showTime(item.createTime),
                            content: `您已缴纳${subFeeName}，缴纳账期${subBillMonth}，订单编号{${orderId}}，支付时间{${paymentTime}}，支付方式{${paymentTypeName}}，缴纳渠道{${paymentChannelName}}`
                        }
                        showMessageModel(messageDetail);
                    }
                } else {
                    CustomFail('请求详情失败');
                }
            });
        } else {
            let params = {
                informationId: item.id1,
                sourceType: 1
            }
            getPropertyBlockInformationPicDetail(params).then(res => {
                alert(JSON.stringify(res))
                if (res.success && res.model && res.model.informationNote) {
                    const { note } = res.model.informationNote
                    let messageDetail = {
                        title: parseInt(item.type) === 10090 ? '社区公告通知' : '欠费通知',
                        createTime: showTime(item.createTime),
                        content: note
                    }
                    showMessageModel(messageDetail);
                } else {
                    CustomFail('请求详情失败');
                }
            });
        }
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