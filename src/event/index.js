import EventBus from './EventBus';

function sendHelloToAndroid () {
    if (window.android != null && typeof (window.android) != "undefined") {
        window.android.callAndroid("你好，Android! ");
    } else {
        alert(typeof (window.android));
    }
}

function callByAndroid () {// 接收来自Android的无参的方法
    alert("Js收到消息");
}

function callByAndroidParam (msg1) { // 接收来自Android的一个参数的方法
    alert("Js收到消息：" + msg1);
}

function callByAndroidMoreParams (objs, msg2, msg3) { // 接收来自Android的多个参数的方法
    alert("Js收到消息：" + "id:" + objs.id.toString() + " name:" + objs.name + " age:" + objs.age.toString() + msg2 + msg3);
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

