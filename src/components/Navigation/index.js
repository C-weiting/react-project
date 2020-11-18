import React from 'react';
import { useHistory } from 'react-router-dom';
import './navigation.less';

export default function Navigation (props) {
    const history = useHistory();

    function handleClick () {
        history.go(-1)
    }

    return (
        <div className="header">
            <span className="back-icon" onClick={handleClick}></span>
            {props.title}
        </div>
    )
}