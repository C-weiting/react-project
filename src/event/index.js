import eventBus from './EventBus';
import { CustomInfo } from '@/components/CustomToast';
import * as actionTypes from './action-types';

function sendHelloToAndroid () {
    if (window.android != null && typeof (window.android) != "undefined") {
        window.android.callAndroid("你好，Android! ");
    }
}

function callByAndroid () {// 接收来自Android的无参的方法
    alert("Js收到消息");
}

function callByAndroidParam (msg) { // 接收来自Android的一个参数的方法
    // CustomInfo(JSON.toString(msg));
    switch (msg.method) {
        case actionTypes.GET_PUSH_MSG: // 来自新城的消息推送
            eventBus.emit(actionTypes.GET_PUSH_MSG, msg.object[0]);
            break;
        case actionTypes.GET_MSG_LIST: // 获取APP缓存的消息列表
            eventBus.emit(actionTypes.GET_MSG_LIST, msg.object);
            break;
        case actionTypes.APP_VERSION: // 获取APP版本信息
            eventBus.emit(actionTypes.APP_VERSION, msg.object);
            break;
        case actionTypes.SET_PUSH_CLIENTID: // 获取个推clientId
            eventBus.emit(actionTypes.SET_PUSH_CLIENTID, msg.object);
            break;
        case actionTypes.SET_IS_UPDATE: // 获取app是否需要更新
            eventBus.emit(actionTypes.SET_IS_UPDATE, msg.object);
            break;
        case actionTypes.GET_DEVICE_ID: // 获取deviceId
            eventBus.emit(actionTypes.GET_DEVICE_ID, msg.object);
            break;
        case actionTypes.GET_NETWORK_STATUS: // 获取网络状态
            eventBus.emit(actionTypes.GET_NETWORK_STATUS, msg.object);
            break;
        default:
            break;
    }
}

function callByAndroidMoreParams (objs, msg2, msg3) { // 接收来自Android的多个参数的方法
    alert("Js收到消息：id:" + objs.id.toString() + " name:" + objs.name + " age:" + objs.age.toString() + msg2 + msg3);
    return "ok";
}

function callByAndroidInteraction (msg) {
    alert("Js收到消息：" + msg);
    window.setTimeout(sendHelloToAndroid, 1000);
}


window.sendHelloToAndroid = sendHelloToAndroid;
window.callByAndroid = callByAndroid;
window.callByAndroidParam = callByAndroidParam;
window.callByAndroidMoreParams = callByAndroidMoreParams;
window.callByAndroidInteraction = callByAndroidInteraction;

