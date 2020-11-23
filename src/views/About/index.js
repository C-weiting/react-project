import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import eventBus from '@/event/EventBus';
import * as eventActionTypes from '@/event/action-types';
import './about.less';

export default function About () {
    const [appVersion, setAppVersion] = useState('');

    useEffect(() => {
        function fn (data) {
            setAppVersion(data);
        }

        eventBus.on(eventActionTypes.APP_VERSION, fn);

        if (window.android != null && typeof (window.android) != "undefined") {
            const data = {
                method: eventActionTypes.APP_VERSION,
            }
            window.android.callAndroid(JSON.stringify(data));
        }

        return () => {
            eventBus.off(eventActionTypes.APP_VERSION, fn);
        }
    }, [])

    return (
        <div className="about">
            <Navigation title="关于" />
            <div className="about-content">
                <img className="icon-logo" src="https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/logo%402x.png" alt=""></img>
                <div className="version">Version {appVersion}</div>
                <div className="last-version">
                    <span className="reflash-icon"></span>
                    您的系统已经是最新版本！
                </div>
            </div>
            <div className="about-footer">
                <div>雅观科技 版权所有</div>
                <div>Copyright © 2019 Argrace.All rights reserved.</div>
            </div>
        </div>
    )
}