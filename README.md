## 与客户端消息通信
- 接受从客户端给的消息
```
    document.addEventListener('message', function (msg) {
      const scheme = JSON.parse(msg.data).scheme
    })
```
- 给客户端发消息
```
    window.ReactNativeWebView.postMessage('客户端需要接受的信息')
```

