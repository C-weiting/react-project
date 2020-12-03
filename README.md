# 与前端 H5 定义的消息格式,都是以 JSON 的形式传输

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

注： 登录回调, 支付回调据拦截这个 method

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
注：isRead 表示消息是否已读(false:未读, true:已读), messageId 是个推提供的消息 id, content 表示新城提供的消息体

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

### 退出登录

H5->native
{
"method":"APP_LOGOUT"
}

### 消息测试

H5->native
{
"method":"PUSH_TEST",
"object":{
"type":"xxx"
}
}

type:目前支持 10090 10091 10092

native->H5
{"method":"GET_PUSH_MSG","object":[{"content":"{\"id2\":\"021-12345678\",\"id1\":6491,\"type\":\"10090\",\"title\":\"新橙社\",\"content\":\"馥华里有新公告，立即查看\"}","isRead":false,"messageId":"c1097c58779a49f3b66c12e1aa0a6d74","read":false}]}

{"method":"GET_PUSH_MSG","object":[{"content":"{\"id2\":\"021-12345678\",\"id1\":6491,\"type\":\"10092\",\"title\":\"已缴费通知\",\"content\":\"馥华里有新公告，立即查看\"}","isRead":false,"messageId":"c1097c58779a49f3b66c12e1aa0a6d74","read":false}]}

{"method":"GET_PUSH_MSG","object":[{"content":"{\"id2\":\"021-12345678\",\"id1\":6491,\"type\":\"10091\",\"title\":\"欠费通知\",\"content\":\"馥华里有新公告，立即查看-冯伟推送 1501\"}","isRead":false,"messageId":"c2d25dc1ebbe4c5da345cb9426eb6a5b","read":false}]}
