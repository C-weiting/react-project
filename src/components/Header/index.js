import React from 'react';
import { useHistory } from 'react-router-dom';
import { Badge } from 'antd-mobile';
import { showLoginModel } from '@/views/Login';
import useMessageList from '@/hooks/useMessageList';
import useMessageSub from '@/hooks/useMessageSub';
import useClientBind from '@/hooks/useClientBind';
import useAppUpgrade from '@/hooks/useAppUpgrade';
import useNetworkSub from '@/hooks/useNetworkSub';
import { showLoginInfoModel } from '@/views/Login';
import './header.less';
import { useSelector } from 'react-redux';

function Header () {
  const history = useHistory();
  const userInfo = useSelector((state) => state.userInfo);
  const { isUpgrade, networkStatus } = useSelector((state) => state.client);

  function loginBtn () {
    if (Object.keys(userInfo).length !== 0) {
      return (
        <span className="xc-btn" onClick={handleUserInfo}>
          新橙社
        </span>
      );
    } else {
      return (
        <span className="login-btn" onClick={handleLogin}>
          登录
        </span>
      );
    }
  }
  let login = loginBtn();

  function handleLogin () {
    showLoginModel();
  }

  function handleUserInfo () {
    showLoginInfoModel();
  }
  function handleMessage () {
    history.push('/message');
  }

  function handleSetting () {
    history.push('/settings');
  }

  const messageList = useMessageList();
  useClientBind();
  useMessageSub();
  useAppUpgrade();
  useNetworkSub();

  return (
    <div className="header-content">
      <div className="left-content">
        <img
          className="icon-logo"
          src="https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/logo%402x.png"
          alt=""
        ></img>
        {
          !networkStatus && (
            <div className="disconnection">
              <span className="loading"></span>
              网络异常，请检查网络
            </div>
          )
        }
      </div>
      <div className="right-content">
        {login}
        <div className="message" onClick={handleMessage}>
          {messageList.length && (
            <Badge
              className="message-badge"
              text={messageList.length}
              overflowCount={99}
              style={{ backgroundColor: '#FF3B3B' }}
            />
          )}
          <i className="iconfont iconxiaoxi"></i>
        </div>
        <div className={`settings ${parseInt(isUpgrade) && 'new'}`} onClick={handleSetting}>
          <i className="iconfont iconshezhi"></i>
        </div>
      </div>
    </div>
  );
}

export default Header;
