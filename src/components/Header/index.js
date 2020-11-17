import React from 'react';
import { Badge } from 'antd-mobile';
import './header.less';

class Header extends React.Component {
    render () {
        return (
            <div className="header-content">
                <img className="icon-logo" src="https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/logo%402x.png" alt=""></img>
                <div className="right-content">
                    <span className="login-btn">登录</span>
                    <div className="message">
                        <Badge className="message-badge" text={77} overflowCount={99} style={{backgroundColor: '#FF3B3B'}} />
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#iconxiaoxi"></use>
                        </svg>
                    </div>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#iconshezhi"></use>
                    </svg>
                </div>
            </div>
        )
    }
}

export default Header;