import React from 'react';
import { useHistory } from 'react-router-dom';
import { Badge } from 'antd-mobile';
import { showLoginModel } from '@/views/Login';
import useMessageList from '@/hooks/useMessageList';
// import { showLoginInfoModel } from '@/views/Login';
import './header.less';

function Header () {

    const history = useHistory();

    function handleLogin () {
        showLoginModel();
        // showLoginInfoModel()
    }

    function handleMessage () {
        history.push('/message');
    }

    function handleSetting () {
        history.push('/settings');
    }

    function handleTestMessage (type) {
        const data = {
            "method": "PUSH_TEST",
            "object": {
                "type": type
            }
        }

        if (window.android != null && typeof (window.android) != "undefined") {
            window.android.callAndroid(JSON.stringify(data));
        } else {
            alert(typeof (window.android));
        }
    }

    function handleGETMSGLIST () {
        const data = {
            "method": "GET_MSG_LIST"
        }

        if (window.android != null && typeof (window.android) != "undefined") {
            window.android.callAndroid(JSON.stringify(data));
        } else {
            alert(typeof (window.android));
        }
    }

    function handleSETMEGREAD (messageId) {
        const data = {
            "method": "SET_MEG_READ",
            "object": {
                "messageId": messageId
            }
        }

        if (window.android != null && typeof (window.android) != "undefined") {
            window.android.callAndroid(JSON.stringify(data));
        } else {
            alert(typeof (window.android));
        }
    }

    function handleSTARTUPGRADE () {
        const data = {
            "method": "START_UPGRADE"
        }

        if (window.android != null && typeof (window.android) != "undefined") {
            window.android.callAndroid(JSON.stringify(data));
        } else {
            alert(typeof (window.android));
        }
    }

    function handleAPPVERSION () {
        const data = {
            "method": "APP_VERSION"
        }

        if (window.android != null && typeof (window.android) != "undefined") {
            window.android.callAndroid(JSON.stringify(data));
        } else {
            alert(typeof (window.android));
        }
    }

    function handleSETPUSHPHONE (phone) {
        const data = {
            "method": "SET_PUSH_PHONE",
            "object": {
                "phone": phone
            }
        }

        if (window.android != null && typeof (window.android) != "undefined") {
            window.android.callAndroid(JSON.stringify(data));
        } else {
            alert(typeof (window.android));
        }
    }

    const messageList = useMessageList();

    return (
        <div className="header-content">
            <img className="icon-logo" src="https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/logo%402x.png" alt=""></img>
            <div className="right-content">
                <span className="login-btn" onClick={() => handleTestMessage(10090)}>10090</span>
                <span className="login-btn" onClick={() => handleTestMessage(10091)}>10091</span>
                <span className="login-btn" onClick={() => handleTestMessage(10092)}>10092</span>
                {/* <span className="login-btn" onClick={handleGETMSGLIST}>GET_MSG_LIST</span>
                <span className="login-btn" onClick={() => handleSETMEGREAD(1)}>SET_MEG_READ</span>
                <span className="login-btn" onClick={handleSTARTUPGRADE}>START_UPGRADE</span>
                <span className="login-btn" onClick={handleAPPVERSION}>APP_VERSION</span>
                <span className="login-btn" onClick={() => handleSETPUSHPHONE(18966480861)}>SET_PUSH_PHONE</span> */}
                <span className="login-btn" onClick={handleLogin}>登录</span>
                <div className="message" onClick={handleMessage}>
                    {messageList.length && <Badge className="message-badge" text={messageList.length} overflowCount={99} style={{ backgroundColor: '#FF3B3B' }} />}
                    <i className="iconfont iconxiaoxi"></i>
                </div>
                <div className="settings new" onClick={handleSetting}>
                    <i className="iconfont iconshezhi"></i>
                </div>
            </div>
        </div>
    )
}

export default Header;