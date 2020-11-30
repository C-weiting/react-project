import React, {useEffect} from 'react';
import { Toast } from 'antd-mobile';
import './home.less';
import Left from './Left';
import Center from './Center';
import Right from './Right';

function Home () {
    // useEffect(() => {
    //     Toast.info('正在建设中，敬请期待', 30);
    // }, [])
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