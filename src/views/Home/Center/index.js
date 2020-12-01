import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { time_range } from '@/utils';
import useLogin from '@/hooks/useLogin';
import { showLoginModel } from '@/views/Login';
import showLightToast from '@/components/LightToast';

export default function HomeCenter () {
    const [title, setTitle] = useState('');
    const [pic, setPic] = useState('');
    const history = useHistory();
    const isLogin = useLogin();

    useEffect(() => {
        function initData () {
            if (time_range('5:00', '12:00')) {// 早
                setTitle('早上好')
                setPic('https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/morning%402x.png')
            } else if (time_range('12:00', '18:00')) { //下午
                setTitle('下午好')
                setPic('https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/noon%402x.png')
            } else {// 晚
                setTitle('晚上好')
                setPic('https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/night%402x.png')
            }
        }

        initData();

        let timer = setInterval(() => {
            initData();
        }, 60 * 10 * 1000)

        return () => {
            clearInterval(timer);
            timer = null;
        }
    }, [])

    function go (path) {
        if(isLogin) {
            history.push(path);
        }else {
            showLoginModel()
        }
    }

    function handleToast () {
        showLightToast();
    }

    return (
        <>
            <div className="time-content">
                <h1 className="title">{title}</h1>
                <img src={pic} className="pic" alt="" />
            </div>
            <ul className="tag-list">
                <li className="tag-item" onClick={() => go('/service')}>
                    <div className="icon-wrapper property"></div>
                    物业服务
                </li>
                <li className="tag-item" onClick={handleToast}>
                    <div className="icon-wrapper camera"></div>
                    摄像监控
                </li>
                <li className="tag-item" onClick={handleToast}>
                    <div className="icon-wrapper elevator"></div>
                    室内呼梯
                </li>
            </ul>
        </>
    )
}