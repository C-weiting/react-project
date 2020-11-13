import React from 'react';
import './header.less';

class Header extends React.Component {
    render () {
        return (
            <div className="header-content">
                <div className="icon-logo"></div>
                <div className="right-content">
                    <span className="icon-message"></span>
                    <span className="icon-set"></span>
                </div>
            </div>
        )
    }
}

export default Header;