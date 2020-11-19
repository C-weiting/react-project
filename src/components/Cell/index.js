import React from 'react';
import './cell.less';

export default function Cell (props) {
    return (
        <div className="cell" onClick={() => { props.onClick() }}>
            <div className="cell-title">{props.title}</div>
            <div className="cell-btn">
                {
                    props.dot && <span className="dot"></span>
                }
                <span className="allow-btn"></span>
            </div>
        </div>
    )
}