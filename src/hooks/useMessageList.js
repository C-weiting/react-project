import { useEffect, useMemo } from 'react';
import eventBus from '@/event/EventBus';
import { useDispatch, useSelector } from 'react-redux';
import * as eventActionTypes from '@/event/action-types';
import * as actionTypes from '@/store/action-types';

function useMessageList () {
    const dispatch = useDispatch();
    const { cacheMessageList, pushMessageList } = useSelector(state => state.message);
    const messageList = useMemo(
        () =>
            [...cacheMessageList, ...pushMessageList],
        [cacheMessageList, pushMessageList]
    );

    useEffect(() => {
        const push_msg_fn = (payload) => {
            dispatch({ type: actionTypes.PUSH_MESSAGE, payload });
        }

        const msg_list_fn = (payload) => {
            dispatch({ type: actionTypes.GET_CACHE_MESSAGELIST, payload });
        }

        eventBus.on(eventActionTypes.GET_PUSH_MSG, push_msg_fn);
        eventBus.on(eventActionTypes.GET_MSG_LIST, msg_list_fn);

        if (window.android != null && typeof (window.android) != "undefined") {
            const data = {
                "method": eventActionTypes.GET_MSG_LIST,
            }
            window.android.callAndroid(JSON.stringify(data));
        }

        return () => {
            eventBus.off(eventActionTypes.GET_PUSH_MSG, push_msg_fn);
            eventBus.off(eventActionTypes.GET_MSG_LIST, msg_list_fn);
        }
    }, [dispatch]);

    return messageList;
}

export default useMessageList;