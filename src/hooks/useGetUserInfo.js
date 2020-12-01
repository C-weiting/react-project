import { useEffect } from 'react';
import eventBus from '@/event/EventBus';
import { useDispatch } from 'react-redux';
import action from '@/store/action/userInfo';
import useLogin from './useLogin';
import * as eventActionTypes from '@/event/action-types';

function useMessageSub () {
    const dispatch = useDispatch();
    const isLogin = useLogin();

    useEffect(() => {
        const fn = (payload) => {
            if (!isLogin) {
                dispatch(action.addUserInfo(payload));
            }
        }

        eventBus.on(eventActionTypes.GET_USER_INFO, fn);
        
        if (!isLogin) {
            if (window.android != null && typeof window.android != 'undefined') {// 每次跳转到首页都重新取一把数据
                const data = {
                    method: eventActionTypes.GET_USER_INFO
                };
                window.android.callAndroid(JSON.stringify(data));
            }
        }

        return () => {
            eventBus.off(eventActionTypes.GET_USER_INFO, fn);
        }
    }, [dispatch, isLogin]);
}

export default useMessageSub;