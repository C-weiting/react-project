import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/views/Home';
import Login from '@/views/Login';
import './layout.less';

function Layout (props) {
    const { path } = useRouteMatch();

    return (
        <div className="layout-content">
            <Header />
            <div className="content">
                <Switch>
                    <Route exact path={path} component={Home}></Route>
                    <Route path={`${path}login`} component={Login}></Route>
                </Switch>
            </div>
            <Footer />
        </div>
    )
}

export default Layout;