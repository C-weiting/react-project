import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge } from 'antd-mobile';
import eventBus from '@/event/EventBus';
import * as eventActionTypes from '@/event/action-types';
import useLogin from '@/hooks/useLogin';
import { showLoginModel } from '@/views/Login';
import './footer.less';

function Footer () {
    const history = useHistory();
    const userInfo = useSelector(state => state.userInfo);
    const isLogin = useLogin();
    const [state, setstate] = useState(1);
    const [recordNum, setRecordNum] = useState(0);

    function handleClick (type) {
        setstate(type)

        if (type === 1) {
            history.push('/');
        } else if (type === 2) {
            if (isLogin) {
                history.push('/callRecord');
            } else {
                showLoginModel()
            }
        } else if (type === 3) {
            history.push('/community');
        }
    }

    useEffect(() => {
        const pathnameMap = {
            '/': 1,
            '/callRecord': 2,
            '/community': 3
        }
        setstate(pathnameMap[history.location.pathname])

    }, [history.location.pathname]);

    useEffect(() => {
        const fn = (payload) => {
            setRecordNum(payload);
        }

        eventBus.on(eventActionTypes.GET_NOT_ANSWER_NUM, fn);

        if (window.android != null && typeof window.android != 'undefined') {
            const data = {
                method: eventActionTypes.GET_NOT_ANSWER_NUM,
                custId: userInfo.custId
            };
            window.android.callAndroid(JSON.stringify(data));
        }

        return () => {
            eventBus.off(eventActionTypes.GET_NOT_ANSWER_NUM, fn);
        }
    }, [userInfo.custId]);

    return (
        <div className="footer">
            <ul className="menu-list">
                <li className={`menu-item ${state === 1 && 'selected'}`}>
                    <i className="iconfont iconshouye" onClick={() => { handleClick(1) }}></i>
                </li>
                <li className={`menu-item ${state === 2 && 'selected'}`}>
                    {
                        recordNum > 0 && (
                            <Badge
                                className="footer-badge"
                                text={recordNum}
                                overflowCount={99}
                                style={{ backgroundColor: '#FF3B3B' }}
                            />
                        )
                    }
                    <i className="iconfont iconkeshiduijiang" onClick={() => { handleClick(2) }}></i>
                </li>
                <li className={`menu-item ${state === 3 && 'selected'}`}>
                    <i className="iconfont iconshequ" onClick={() => { handleClick(3) }}></i>
                </li>
            </ul>
        </div>
    )
}

export default Footer;