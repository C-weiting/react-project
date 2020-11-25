import { useEffect } from 'react';
import eventBus from '@/event/EventBus';
import { useDispatch } from 'react-redux';
import * as eventActionTypes from '@/event/action-types';
import * as actionTypes from '@/store/action-types';

function useMessageSub () {
    const dispatch = useDispatch();

    useEffect(() => {
        const push_msg_fn = (payload) => {
            dispatch({ type: actionTypes.PUSH_MESSAGE, payload });
        }

        const msg_list_fn = (payload) => {
            dispatch({ type: actionTypes.GET_CACHE_MESSAGELIST, payload });
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