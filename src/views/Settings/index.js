import React from 'react';
import { useHistory } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Cell from '@/components/Cell';
import { useSelector } from 'react-redux';
import './settings.less';

export default function Settings () {

    const history = useHistory();
    const { isUpgrade } = useSelector((state) => state.client);

    function handleClick () {
        history.push('./about');
    }

    return (
        <div className="settings">
            <Navigation title="设置" />
            <div className="setting-content">
                <div className="title">系统</div>
                <Cell title="关于" dot={!!parseInt(isUpgrade)} onClick={handleClick} />
            </div>
        </div>
    )
}