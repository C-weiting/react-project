import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/views/Home';

import Community from '@/views/Community'
import './layout.less';

function Layout (props) {
    const { path } = useRouteMatch();

    return (
        <div className="layout-content">
            <Header />
            <div className="content">
                <Switch>
                    <Route exact path={path} component={Home}></Route>
                    <Route path={`${path}community`} component={Community}></Route>
                </Switch>
            </div>
            <Footer />
        </div>
    )
}

export default Layout;