import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { time_range } from '@/utils';

export default function HomeCenter () {
    const [title, setTitle] = useState('');
    const [pic, setPic] = useState('');
    const history = useHistory();

    useEffect(() => {
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
    }, [])

    function go(path){
        history.push(path);
    }

    return (
        <>
            <div className="time-content">
                <h1 className="title">{title}</h1>
                <img src={pic} className="pic" alt="" />
            </div>
            <ul className="tag-list">
                <li className="tag-item" onClick={() => go('/service')}>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#iconwuyefuwu"></use>
                    </svg>
                    物业服务
                </li>
                <li className="tag-item">
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#iconshexiangjiankong"></use>
                    </svg>
                    摄像监控
                </li>
                <li className="tag-item">
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#iconshineihuti"></use>
                    </svg>
                    室内呼梯
                </li>
            </ul>
        </>
    )
}