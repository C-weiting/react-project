import React from 'react';
import './home.less';
import Left from './Left';
import Center from './Center';
import Right from './Right';

function Home () {

    return (
        <div className="home-content">
            <div className="left-content">
                <Left />
            </div>
            <div className="center-content">
                <Center />
            </div>
            <div className="right-content">
                <Right />
            </div>
        </div>
    )
}

export default Home;