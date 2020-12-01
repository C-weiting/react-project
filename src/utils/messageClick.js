import { CustomFail, CustomLoading, CustomHide } from '@/components/CustomToast';
import { getPropertyBlockInformationPicDetail, queryPropertyOrderDetail } from '@/api/message';
import { showMessageModel, showMessageConfirmModel } from '@/components/MessageModel';
import { showTime } from '@/utils';
import * as actionTypes from '@/store/action-types';
import * as eventActionTypes from '@/event/action-types';

function beforeShowMessageModel (messageDetail, messageId, dispatch) {
    showMessageModel(messageDetail);
    dispatch({ type: actionTypes.READ_MESSAGE, payload: messageId });
    if (window.android != null && typeof (window.android) != "undefined") {
        const data = {
            method: eventActionTypes.SET_MEG_READ,
            object: {
                messageId: messageId
            }
        }
        window.android.callAndroid(JSON.stringify(data));
    }
}

function beforeShowMessageConfirmModel (messageDetail, cb) {
    showMessageConfirmModel(messageDetail, cb);
}

function messageClick (item, dispatch, history) {
    if (parseInt(item.type) === 10092) { // 已缴费通知
        CustomLoading('', 0);
        const orderId = item.id1; // 12011181533601682
        let params = {
            orderId: orderId,
            data: `orderId=${orderId}`
        }
        queryPropertyOrderDetail(params).then(res => {
            CustomHide();
            if (res.success && res.model) {
                let { propertyBillList, orderId, paymentTime, paymentTypeName, paymentChannelName } = res.model
                if (propertyBillList && propertyBillList.length) {
                    const { subBillMonth, subFeeName } = propertyBillList[0];

                    let messageDetail = {
                        title: '已缴费通知',
                        createTime: showTime(item.createTime),
                        content: `您已缴纳${subFeeName}，缴纳账期${subBillMonth}，订单编号{${orderId}}，支付时间{${paymentTime}}，支付方式{${paymentTypeName}}，缴纳渠道{${paymentChannelName}}`
                    }
                    beforeShowMessageModel(messageDetail, item.messageId, dispatch);
                }
            } else {
                CustomFail('请求详情失败');
            }
        });
    } else if (parseInt(item.type) === 10090) {
        CustomLoading('', 0);
        let params = {
            informationId: item.id1,
            sourceType: 1
        }
        getPropertyBlockInformationPicDetail(params).then(res => {
            CustomHide();
            if (res.success && res.model && res.model.informationNote) {
                const { note } = res.model.informationNote
                let messageDetail = {
                    title: '社区公告通知',
                    createTime: showTime(item.createTime),
                    content: note
                }
                beforeShowMessageModel(messageDetail, item.messageId, dispatch);
            } else {
                CustomFail('请求详情失败');
            }
        });
    } else if (parseInt(item.type) === 10091) {
        let messageDetail = {
            title: '欠费通知',
            createTime: showTime(item.createTime),
            content: '最新的物业账单已出，请按时缴纳'
        }

        const cb = () => {
            history.push('/service/pay');
            dispatch({ type: actionTypes.READ_MESSAGE, payload: item.messageId });
            if (window.android != null && typeof (window.android) != "undefined") {
                const data = {
                    method: eventActionTypes.SET_MEG_READ,
                    object: {
                        messageId: item.messageId
                    }
                }
                window.android.callAndroid(JSON.stringify(data));
            }
        }

        beforeShowMessageConfirmModel(messageDetail, cb);
    }
}

export default messageClick;