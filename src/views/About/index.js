import React from 'react';
import Navigation from '@/components/Navigation';
import './about.less';

export default function About() {
    return (
        <div className="about">
            <Navigation title="关于" />
            <div className="about-content">
                <img className="icon-logo" src="https://argrace-web.oss-cn-hangzhou.aliyuncs.com/xincheng-web/images/logo%402x.png" alt=""></img>
                <div className="version">Version 1.0.0.1</div>
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