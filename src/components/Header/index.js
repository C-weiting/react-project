import React from 'react';
import { useHistory } from 'react-router-dom';
import { Badge } from 'antd-mobile';
import { showLoginModel } from '@/views/Login';
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

    return (
        <div className="header-content">
            <img className="icon-logo" src="https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/logo%402x.png" alt=""></img>
            <div className="right-content">
                <span className="login-btn" onClick={handleLogin}>登录</span>
                <div className="message" onClick={handleMessage}>
                    <Badge className="message-badge" text={77} overflowCount={99} style={{ backgroundColor: '#FF3B3B' }} />
                    <i className="iconfont iconxiaoxi"></i>
                </div>
                <div className="settings new">
                    <i className="iconfont iconshezhi"></i>
                </div>
            </div>
        </div>
    )
}

export default Header;