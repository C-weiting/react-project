import React from 'react';
import { useHistory } from 'react-router-dom';
import { Badge } from 'antd-mobile';
import { showLoginModel } from '@/views/Login';
import useMessageList from '@/hooks/useMessageList';
import useMessageSub from '@/hooks/useMessageSub';
import useClientBind from '@/hooks/useClientBind';
import useAppUpgrade from '@/hooks/useAppUpgrade';
import { showLoginInfoModel } from '@/views/Login';
import './header.less';
import { useSelector } from 'react-redux';

function Header () {
  const history = useHistory();
  const userInfo = useSelector((state) => state.userInfo);
  const { isUpgrade } = useSelector((state) => state.client);

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

  function handleTestMessage (type) {
    const data = {
      method: 'PUSH_TEST',
      object: {
        type: type,
      },
    };

    if (window.android != null && typeof window.android != 'undefined') {
      window.android.callAndroid(JSON.stringify(data));
    } else {
      
    }
  }


  const messageList = useMessageList();
  useClientBind();
  useMessageSub();
  useAppUpgrade();

  return (
    <div className="header-content">
      <img
        className="icon-logo"
        src="https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/logo%402x.png"
        alt=""
      ></img>
      <div className="right-content">
        {/* <span className="login-btn" onClick={() => handleTestMessage(10090)}>
          10090
        </span>
        <span className="login-btn" onClick={() => handleTestMessage(10091)}>
          10091
        </span>
        <span className="login-btn" onClick={() => handleTestMessage(10092)}>
          10092
        </span> */}
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
