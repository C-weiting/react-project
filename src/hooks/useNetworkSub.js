import { useEffect } from 'react';
import eventBus from '@/event/EventBus';
import { useDispatch } from 'react-redux';
import * as eventActionTypes from '@/event/action-types';
import * as actionTypes from '@/store/action-types';

function useMessageSub () {
    const dispatch = useDispatch();

    useEffect(() => {
        const fn = (payload) => {
            dispatch({ type: actionTypes.GET_NETWORK_STATUS, payload });
        }

        eventBus.on(eventActionTypes.GET_NETWORK_STATUS, fn);

        return () => {
            eventBus.off(eventActionTypes.GET_NETWORK_STATUS, fn);
        }
    }, [dispatch]);
}

export default useMessageSub;