import { useEffect } from 'react';
import eventBus from '@/event/EventBus';
import { useDispatch } from 'react-redux';
import * as eventActionTypes from '@/event/action-types';
import * as actionTypes from '@/store/action-types';

function useMessageSub () {
    const dispatch = useDispatch();

    useEffect(() => {
        const push_msg_fn = (payload) => {
            dispatch({ type: actionTypes.PUSH_MESSAGE, payload: { ...payload, createTime: new Date().getTime() } });
        }

        const msg_list_fn = (payload) => {
            dispatch({ type: actionTypes.GET_CACHE_MESSAGELIST, payload: payload.map(item => ({ ...item, createTime: new Date().getTime() })) });
        }

        eventBus.on(eventActionTypes.GET_PUSH_MSG, push_msg_fn);
        eventBus.on(eventActionTypes.GET_MSG_LIST, msg_list_fn);

        return () => {
            eventBus.off(eventActionTypes.GET_PUSH_MSG, push_msg_fn);
            eventBus.off(eventActionTypes.GET_MSG_LIST, msg_list_fn);
        }
    }, [dispatch]);
}

export default useMessageSub;