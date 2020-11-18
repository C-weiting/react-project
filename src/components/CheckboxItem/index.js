import React, {useState} from 'react';
import './checkbox.less';

export default function CheckboxItem(props) {
    const [state, setstate] = useState(false);

    function handleClick() {
        props.onChange(!state);
        setstate(!state);
    }

    return (
        <span className={`checkbox-item ${state ? 'selected' : ''}`} onClick={handleClick}></span>
    )
}