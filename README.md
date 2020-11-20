
# 与前端H5定义的消息格式,都是以JSON的形式传输
```aidl
{"method":"","object":{}}
```

### 消息推送
1. 接收到的消息
native->H5
{
    "method":"GET_PUSH_MSG",
    "object":[
        {
            "messageId":"xxx",
            "content":"xxx"
        }
    ]
}

注： 登陆回调, 支付回调据拦截这个method

2. 获取手机缓存消息列表
H5->native
{
    "method":"GET_MSG_LIST"
}

native->H5
{
    "method":"GET_MSG_LIST",
    "object":[
        {
            "id":1,
            "messageId":"xxx",
            "content":"xxx",
            "isRead":false
        },
        {
            "id":2,
            "messageId":"xxx",
            "content":"xxx",
            "isRead":true
        }
    ]
}
注：isRead表示消息是否已读(false:未读, true:已读), messageId是个推提供的消息id, content表示新城提供的消息体

3. 标记消息已读
H5->native
{
    "method":"SET_MEG_READ",
    "object":{
        "messageId":"xxx"
    }
}

### 升级
1. 开始更新下载
H5->native
{
    "method":"START_UPGRADE"
}

### 应用版本
H5->native
{
    "method":"APP_VERSION"
}

native->H5
{
    "method":"APP_VERSION",
    "object":"1.2.3"
}

### 提供原生账号手机号(目的是绑定推送)
H5->native
{
    "method":"SET_PUSH_PHONE",
    "object":{
            "phone":"xxx"
    }
}












