import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import eventBus from '@/event/EventBus';
import * as eventActionTypes from '@/event/action-types';
import * as actionTypes from '@/store/action-types';

function useAppUpgrade () {
    const dispatch = useDispatch();
    useEffect(() => {
        const fn = (payload) => {
            dispatch({ type: actionTypes.SET_IS_UPDATE, payload });
        }

        eventBus.on(eventActionTypes.SET_IS_UPDATE, fn);

        if (window.android != null && typeof window.android != 'undefined') {// 获取是否需要更新
            const data = {
                method: eventActionTypes.SET_IS_UPDATE,
            };
            window.android.callAndroid(JSON.stringify(data));
        }

        return () => {
            eventBus.off(eventActionTypes.SET_IS_UPDATE, fn);
        }
    }, [dispatch]);
}

export default useAppUpgrade;