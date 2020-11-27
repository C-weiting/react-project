import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './footer.less';

function Footer () {
    const history = useHistory();
    const [state, setstate] = useState(1);

    function handleClick (type) {
        setstate(type)

        if (type === 1) {
            history.push('/');
        } else if (type === 2) {

        } else if (type === 3) {
            history.push('/community');
        }
    }

    useEffect(() => {
        const pathnameMap = {
            '/': 1,
            '/community': 3
        }
        setstate(pathnameMap[history.location.pathname])

    }, [history.location.pathname]);

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