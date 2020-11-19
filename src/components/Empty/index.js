import React from 'react';
import './empty.less';

export default function Empty (props) {
    return (
        <div className="empty-page">
            <img src={props.pic} className="empty-pic" alt="" />
            <h4 className="empty-text">{props.text}</h4>
        </div>
    )
}