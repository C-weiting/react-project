import React from 'react';
import { Toast } from 'antd-mobile';
import './custom-toast.less';

function Success (props) {
    return (
        <div className="custom-toast">
            <svg className="icon" aria-hidden="true">
                <use xlinkHref="#iconchenggong"></use>
            </svg>
            <h1 className="text">{props.text}</h1>
        </div>
    )
}

function Fail (props) {
    return (
        <div className="custom-toast">
            <svg className="icon" aria-hidden="true">
                <use xlinkHref="#iconcuowu"></use>
            </svg>
            <h1 className="text">{props.text}</h1>
        </div>
    )
}

function Info (props) {
    return (
        <div className="custom-toast">
            <svg className="icon" aria-hidden="true">
                <use xlinkHref="#iconjinggao"></use>
            </svg>
            <h1 className="text">{props.text}</h1>
        </div>
    )
}

export function CustomSuccess (text) {
    return Toast.info(<Success text={text} />, 300)
}

export function CustomFail (text) {
    return Toast.info(<Fail text={text} />, 200)
}

export function CustomInfo (text) {
    return Toast.info(<Info text={text} />, 100)
}