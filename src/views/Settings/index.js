import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Cell from '@/components/Cell';
import { useSelector, useDispatch } from 'react-redux';
import * as actionTypes from '@/store/action-types';
import './settings.less';

export default function Settings () {
    const history = useHistory();
    const dispatch = useDispatch();
    const { isUpgrade } = useSelector((state) => state.client);

    function handleClick () {
        history.push('./about');
    }

    useEffect(() => {
        dispatch({ type: actionTypes.SET_HOME_UPDATE, payload: false })
    }, [dispatch])

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