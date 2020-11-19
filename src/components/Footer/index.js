import React, { useState } from 'react';
import './footer.less';

function Footer () {

    const [state, setstate] = useState(1)

    function handleClick (type) {
        setstate(type)
    }

    return (
        <div className="footer">
            <ul className="menu-list">
                <li className={`menu-item ${state === 1 && 'selected'}`}>
                    <i className="iconfont iconshouye" onClick={() => { handleClick(1) }}></i>
                </li>
                <li className={`menu-item ${state === 2 && 'selected'}`}>
                    <i className="iconfont iconkeshiduijiang" onClick={() => { handleClick(2) }}></i>
                </li>
                <li className={`menu-item ${state === 3 && 'selected'}`}>
                    <i className="iconfont iconshequ" onClick={() => { handleClick(3) }}></i>
                </li>
            </ul>
        </div>
    )
}

export default Footer;