import React from 'react';
import { Toast } from 'antd-mobile';
import './custom-toast.less';

function Success (props) {
    return (
        <div className="custom-toast">
            <i className="iconfont iconchenggong"></i>
            <h1 className="text">{props.text}</h1>
        </div>
    )
}

function Fail (props) {
    return (
        <div className="custom-toast">
            <i className="iconfont iconcuowu"></i>
            <h1 className="text">{props.text}</h1>
        </div>
    )
}

function Info (props) {
    return (
        <div className="custom-toast">
            <i className="iconfont iconjinggao"></i>
            <h1 className="text">{props.text}</h1>
        </div>
    )
}

export function CustomSuccess (text) {
    return Toast.info(<Success text={text} />, 2)
}

export function CustomFail (text) {
    return Toast.info(<Fail text={text} />, 2)
}

export function CustomInfo (text) {
    return Toast.info(<Info text={text} />, 2)
}