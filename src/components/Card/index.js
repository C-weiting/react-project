import React from 'react';
import './card.less';

export default function Card (props) {
    return (
        <div className="card">
            <div className="title">{props.title}</div>
            <div className="body-pic">
                <img src={props.pic} className="pic" alt="" />
            </div>
            <h4 className="desc">{props.desc}</h4>
        </div>
    )
}