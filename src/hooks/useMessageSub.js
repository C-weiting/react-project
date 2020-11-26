import { useEffect } from 'react';
import eventBus from '@/event/EventBus';
import { useDispatch, useSelector } from 'react-redux';
import * as eventActionTypes from '@/event/action-types';
import * as actionTypes from '@/store/action-types';

function useMessageSub () {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userInfo);

    useEffect(() => {
        const push_msg_fn = (payload) => {
            dispatch({ type: actionTypes.PUSH_MESSAGE, payload });
        }

        const msg_list_fn = (payload) => {
            dispatch({ type: actionTypes.GET_CACHE_MESSAGELIST, payload });
        }

        eventBus.on(eventActionTypes.GET_PUSH_MSG, push_msg_fn);
        eventBus.on(eventActionTypes.GET_MSG_LIST, msg_list_fn);

        if (window.android != null && typeof window.android != 'undefined') {// 每次跳转到首页都重新取一把数据
            const data = {
                method: eventActionTypes.GET_MSG_LIST,
                custId: userInfo.custId
            };
            window.android.callAndroid(JSON.stringify(data));
        }

        return () => {
            eventBus.off(eventActionTypes.GET_PUSH_MSG, push_msg_fn);
            eventBus.off(eventActionTypes.GET_MSG_LIST, msg_list_fn);
            dispatch({ type: actionTypes.CLEAR_MESSAGELIST }); //每次跳到每部页面都清缓存
        }
    }, [dispatch, userInfo.custId]);
}

export default useMessageSub;